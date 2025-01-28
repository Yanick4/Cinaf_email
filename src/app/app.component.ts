import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OneSignalService } from './services/one-signal.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'test_notification_push';
  oneSignal=inject(OneSignalService)

  ngOnInit(): void {
      this.oneSignal.initOneSignal()
      this.oneSignal.getUserId()
  }

}
