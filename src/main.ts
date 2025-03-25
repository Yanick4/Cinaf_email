import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker enregistré avec succès :', registration);
    })
    .catch((error) => {
      console.error('Erreur lors de l’enregistrement du Service Worker :', error);
    });
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
