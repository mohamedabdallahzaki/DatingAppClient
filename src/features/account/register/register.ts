import { Component, EventEmitter, inject, Output, output } from '@angular/core';
import { RegisterCreds } from '../../../types/user';
import { FormsModule, NgModel } from '@angular/forms';
import { Account } from '../../../core/services/account';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  accountService = inject(Account)
  
  creds = {} as RegisterCreds;
 @Output() cancelRegister = new EventEmitter<boolean>();


  Register(){
    this.accountService.register(this.creds).subscribe({
      next: (user) =>{
        console.log(user);
        this.creds= {} as RegisterCreds; 
      },
      error: (error)=>{
        console.log(error);
      }

    })
  }

  cancel(){
    this.cancelRegister.emit(false)
  }

}

