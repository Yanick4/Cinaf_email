import { Component, inject, OnInit } from '@angular/core';
import { OneSignalService } from './services/one-signal.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Test de notification push';
  oneSignal=inject(OneSignalService)

  constructor(){
    this.oneSignal.receive_notification()
  }


  ngOnInit(): void {
    this.oneSignal.config_notification_push()
  }



}
