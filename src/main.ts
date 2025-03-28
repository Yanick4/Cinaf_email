import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';


navigator.serviceWorker.register('/firebase-messaging-sw.js')
  .then((registration) => {
    console.log('Service Worker Firebase enregistré !', registration);
  }).catch(err => console.error('Erreur Service Worker:', err));
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
