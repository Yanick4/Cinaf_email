import { inject, Injectable } from '@angular/core';
import { OneSignal } from "onesignal-ngx"
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getMessaging, getToken, onMessage} from "firebase/messaging"

@Injectable({
  providedIn: 'root'
})
export class OneSignalService{
  private readonly oneSignal=inject(OneSignal)
  private readonly _http=inject(HttpClientService)


  public initOneSignal(){
    try {
      this.oneSignal.init({
        appId: "6813c394-dfeb-4141-976a-74c9f6178f8a",
        serviceWorkerParam: { scope: '/' },
        serviceWorkerPath:'/OneSignalSDKWorker.js'
      }).then(() => {
        this.oneSignal.User.PushSubscription.addEventListener("change", (event) => {
          if(event.current.id){
            this._http.register_player_id({player_id:event.current.id,authorizer:true}).subscribe({
              next:()=>console.log("Player id registered"),
              error:(err:HttpErrorResponse)=>console.log("Player id registration error",err),
              complete:()=>console.log("Player id registration complete")
            })
          }else{
            this.oneSignal.User.PushSubscription.optIn().then(()=>{
              this._http.register_player_id({player_id:event.current.id,authorizer:true}).subscribe({
                next:()=>console.log("Player id registered"),
                error:(err:HttpErrorResponse)=>console.log("Player id registration error",err),
                complete:()=>console.log("Player id registration complete")
              })
            })
          }
        })
      })
    } catch (error) {
      
    }
  }


  public config_notification_push (){
    const firebaseConfig = {
      apiKey: "AIzaSyBEv24sA97q2ghQO_9jTcsrHLH_R6A9ZAE",
      authDomain: "cinaf-mail-6a29b.firebaseapp.com",
      projectId: "cinaf-mail-6a29b",
      storageBucket: "cinaf-mail-6a29b.firebasestorage.app",
      messagingSenderId: "852024543958",
      appId: "1:852024543958:web:85bff95393a82d361c5777",
      measurementId: "G-748PWHSZ2N"
    };

    const app=initializeApp(firebaseConfig)
    const analytics = getAnalytics(app)

    Notification.requestPermission().then((permission) => {
      if(permission==="granted"){
        this.getFCMToken(getMessaging(app))
      }else{
        console.log('Notification permission denied');
      }
    }).catch((err) => {
      console.log('Notification permission denied', err);
    })

    onMessage(getMessaging(app),(payload)=>{
      console.log("Message received. ",payload)
    })
  }


  private async getFCMToken(messaging:any){
    try {
      const token= await getToken(messaging,{vapidKey:"BCK8U4D9rqcue6S4OX5RarKU6iQT5xUbWgLzfdqVnHEL_jWA71qX5bGVlYRc2wFAs7f79PzMRcA0__qX7l-NNtw"})
      if(token){
        console.log("FCM token",token)
        this._http.register_player_id({player_id:token,authorizer:true}).subscribe({
          next:(response)=>console.log("Player id registered",response),
          complete:()=>console.log("Player id registration complete")
        })
      }
    } catch (error) {
      console.log("Error getting FCM token",error)
    }
  }

















}
