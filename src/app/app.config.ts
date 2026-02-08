import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, Router, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { Init } from '../core/services/init';
import { lastValueFrom } from 'rxjs';
import { errorInterceptorInterceptor } from '../core/interceptor/error-interceptor-interceptor';
import { jwtTokenInterceptor } from '../core/interceptor/jwt-token-interceptor';
import { loadingInterceptorInterceptor } from '../core/interceptor/loading-interceptor-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes,withViewTransitions()),
    provideHttpClient(withInterceptors([errorInterceptorInterceptor, jwtTokenInterceptor,loadingInterceptorInterceptor])),
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
