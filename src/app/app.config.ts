import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'zenacad-dev',
        appId: '1:57654607769:web:6e7d070311c73ac3e29d08',
        storageBucket: 'zenacad-dev.appspot.com',
        apiKey: 'AIzaSyBtw_CsFZ3xDO00hl-u1d3n28G-zB_q7Nk',
        authDomain: 'zenacad-dev.firebaseapp.com',
        messagingSenderId: '57654607769',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideAnimationsAsync(),
  ],
};
