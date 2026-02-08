import { ResolveFn, Router } from '@angular/router';
import {  MemberService } from '../../../../core/services/member';
import { inject } from '@angular/core';
import { EMPTY } from 'rxjs';
import { member } from '../../../../types/member';


export const memberResloverResolver: ResolveFn<member> = (route, state) => {
  const routing = inject(Router)
  const memberServicce = inject(MemberService)
  const member = memberServicce.getMemberById(route.paramMap.get('id')!)

  if(!member){
    routing.navigateByUrl('/Not-Found')
    return EMPTY
  }

  return member;



};
