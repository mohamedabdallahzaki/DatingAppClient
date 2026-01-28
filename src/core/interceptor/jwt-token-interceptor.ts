import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Account } from '../services/account';

export const jwtTokenInterceptor: HttpInterceptorFn = (req, next) => {

 const accountService = inject(Account)

 const user = accountService.currentUser();
 if(user){
  req = req.clone({
    setHeaders :{
      Authorization :`Bearer ${user.token}`
    }
  })
 }

  return next(req);
};
