import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Account } from '../../../core/services/account';
import { CommonModule } from '@angular/common';
import { InputText } from '../../shared/input-text/input-text';
import { Router } from '@angular/router';
import { RegisterCreds } from '../../../types/user';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, InputText],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register  {
  accountService = inject(Account);
  fp = inject(FormBuilder);
  private router = inject(Router)
  @Output() cancelRegister = new EventEmitter<boolean>();
  protected registerForm: FormGroup;
  protected profileForm: FormGroup;

  protected currentSteps = signal(1);

  protected validtionErros = signal<string[]>([])

  constructor() {
     this.registerForm = this.fp.group({
      email: ['',[Validators.required, Validators.email]],
      displayName:['',[Validators.required,Validators.minLength(2)]],
      password: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(8)]],
      confirmPassword: ['',[Validators.required,this.match('password')]]
    });
    this.profileForm= this.fp.group({
      gender:['male',[Validators.required]],
      dateOfBirth:['',[Validators.required]],
      city:['',[Validators.required]],
      country:['',[Validators.required]]
    
    });
    this.registerForm.controls['password'].valueChanges.subscribe(() => { 
      this.registerForm?.controls['confirmPassword'].updateValueAndValidity();
    });
  }

  MaxDate() {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today.toISOString().split('T')[0];
  }
  Register() {
    if (this.registerForm.valid && this.profileForm.valid) {
      const formData: RegisterCreds = { ...this.registerForm.value, ...this.profileForm.value };
       this.accountService.register(formData).subscribe({
        next: response =>{
          this.router.navigateByUrl("/members");
          this.cancel()
        },
        error: err =>{
          console.log(err)
          this.validtionErros.set(err);
        }
       })
    }

   
  }

  NextStep() {
    if (this.registerForm.valid) {
      this.currentSteps.update((nextStep) => nextStep + 1);
      return;
    }
    this.registerForm.markAllAsTouched();
  }

  PrevStep() {
    this.currentSteps.update((prevStep) => prevStep - 1);
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
  match(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = control.parent;
      if (!parent) return null;
      const matchValue = parent.get(matchTo)?.value;
      return control.value === matchValue ? null : { passwordMatch: true };
    };
  }

}
