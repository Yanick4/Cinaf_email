import { inject, Injectable } from '@angular/core';
import { OneSignal } from "onesignal-ngx"
@Injectable({
  providedIn: 'root'
})
export class OneSignalService {
  private oneSignal=inject(OneSignal)

  public initOneSignal(){
    this.oneSignal.init({
      appId: "6813c394-dfeb-4141-976a-74c9f6178f8a",
      serviceWorkerParam: { scope: '/' },
      serviceWorkerPath:'/OneSignalSDKWorker.js'
    }).then(() => {
      this.oneSignal.User.PushSubscription.addEventListener("change", (event) => {
        console.log("Push subscription change", event.current.id);
      })
    })
  }
}
