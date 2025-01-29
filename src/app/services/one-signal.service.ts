import { inject, Injectable } from '@angular/core';
import { OneSignal } from "onesignal-ngx"
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class OneSignalService{
  private readonly oneSignal=inject(OneSignal)
  private readonly _http=inject(HttpClientService)


  public initOneSignal(){
    this.oneSignal.init({
      appId: "6813c394-dfeb-4141-976a-74c9f6178f8a",
      serviceWorkerParam: { scope: '/' },
      serviceWorkerPath:'/OneSignalSDKWorker.js'
    }).then(() => {
      this.oneSignal.User.PushSubscription.addEventListener("change", (event) => {
        if(event.current.id){
          this._http.register_player_id({player_id:event.current.id,authorizer:true}).subscribe({
            next:()=>console.log("Player id registered"),
            error:()=>console.log("Player id not registered"),
            complete:()=>console.log("Player id registration complete")
          })
        }
        console.log("Push subscription change", event.current.id);
      })
    })
  }
}
