import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading-service';
import { delay, finalize } from 'rxjs';

export const loadingInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  
  const loadingService = inject(LoadingService)

  loadingService.busy()
  
  return next(req).pipe(
    delay(500),
    finalize(() =>{
      loadingService.idel()
    })
  )
};
