import { inject, Injectable } from '@angular/core';
import { Account } from './account';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Init {
  
  accountService = inject(Account)

  init() {
     const userString = localStorage.getItem("user")  ;
    if(!userString) return of(null);

    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);

    return of(null)
  }

}
