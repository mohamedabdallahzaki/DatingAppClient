import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';
import { Toast } from '../services/toast';
import { NavigationExtras, Router } from '@angular/router';

export const errorInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  const toast = inject(Toast)
  const router = inject(Router)
  return next(req).pipe(
    catchError(error =>{
      if(error){
        switch (error.status){
          case 400:
            toast.error(error.error,1000);
            break;
          case 401 :
            toast.error("Unauthorized",1000)
            break;
          case 404:
            router.navigateByUrl('/Not-Found')
            toast.error("Not-Found",500)
            break;
            case 500:
              toast.error("Server-Error",1000)
              const navigationExtras:NavigationExtras = {state:{error:error.error}}
              router.navigateByUrl("/Server-error",navigationExtras)
              break;
            default :
            break;


        }
      }

      throw  error
    })
    
  )
};
