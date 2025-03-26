import { inject, Injectable } from '@angular/core';
import { OneSignal } from "onesignal-ngx"
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { Messaging, getToken, onMessage} from "@angular/fire/messaging"
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OneSignalService{
  private readonly oneSignal=inject(OneSignal)
  private readonly _http=inject(HttpClientService)
  private readonly _messaging=inject(Messaging)



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

    Notification.requestPermission().then((permission) => {
      if(permission==="granted"){
        this.getFCMToken(this._messaging)
      }else{
        console.log('Notification permission denied');
      }
    }).catch((err) => {
      console.log('Notification permission denied', err);
    })
  }

  public receive_notification(){
    onMessage(this._messaging,(payload)=>{
      console.log("Message received. ",payload)
      const title:string=payload.notification?.title || "Notification"
      try {
        if(Notification.permission==="granted"){
          navigator.serviceWorker.getRegistration().then((registration)=>{
            registration?.showNotification(title,{
              body:payload.notification?.body,
              icon:"/logo.018d9124.png"
            })
          })
        }
      } catch (error) {
        console.log("Error showing notification",error)
      }
    })
  }




  private async getFCMToken(messaging:any){
    try {
      const token= await getToken(messaging,{vapidKey:environment.firebase.vapidKey})
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
