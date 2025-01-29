import { Component, inject, OnInit } from '@angular/core';
import { OneSignalService } from './services/one-signal.service';
import { HttpClientService } from './http-client.service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Test de notification push';
  oneSignal=inject(OneSignalService)
  private readonly _http=inject(HttpClientService)

  ngOnInit(): void {
    this.oneSignal.initOneSignal()
  }

  protected sendNotification(){
    this._http.send_notification({title:"Test",content:"Test de notification"}).subscribe({
      next:()=>console.log("Notification sent"),
      error:()=>console.log("Notification error"),
      complete:()=>console.log("Notification complete")
    })
  }

}
