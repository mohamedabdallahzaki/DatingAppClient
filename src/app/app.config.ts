import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, Router, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { Init } from '../core/services/init';
import { lastValueFrom } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes,withViewTransitions()),
    provideHttpClient(),
    provideAppInitializer(async () => {
      const initService = inject(Init);

      return new Promise<void>((reslover) => {
        setTimeout(async () => {
          try {
            return lastValueFrom(initService.init());
          } finally {
            const splash = document.getElementById('init-splash');
            if (splash) {
              splash.remove();
            }
            reslover()
          }
        },1000);
      });
    }),
  ],
};
