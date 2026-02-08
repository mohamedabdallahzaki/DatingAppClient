import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Account } from '../services/account';
import { Toast } from '../services/toast';

export const authGuard: CanActivateFn = (route, state) => {
 const accountService = inject(Account)
 const toast = inject(Toast)
 const routing = inject(Router)

 if(accountService.currentUser()){
  return true;
 }
 else{
  routing.navigate(['/'],{queryParams:{returnUrl:state.url}})
  toast.error("you cann't go ",2000)
  return false;
 }

};
