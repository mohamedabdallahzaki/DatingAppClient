import { Component, inject, signal } from '@angular/core';
import { Register } from "../account/register/register";
import { Account } from '../../core/services/account';

@Component({
  selector: 'app-home-page',
  imports: [Register
    
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

  accountService = inject(Account)

  registered = signal(false);

  Registered(value:boolean){
    this.registered.set(value);
  }

  cancelRegistration(value:boolean){
    this.registered.set(value)
  }
}
