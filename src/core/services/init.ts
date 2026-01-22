import { inject, Injectable } from '@angular/core';
import { Account } from './account';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Init {
  
  accountService = inject(Account)
  router = inject(Router)

  init() {
     const userString = localStorage.getItem("user")  ;
    if(!userString) return of(null);
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
    return of(null)
  }

}
