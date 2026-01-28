import { Component, inject, OnInit } from '@angular/core';
import { Member } from '../../../core/services/member';
import { ActivatedRoute, RouterLinkActive, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { member } from '../../../types/member';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-members-detalied',
  imports: [AsyncPipe,CommonModule],
  templateUrl: './members-detalied.html',
  styleUrl: './members-detalied.css',
})
export class MembersDetalied {
  memberservice =inject(Member)
  router = inject(ActivatedRoute)
  
  member$:Observable<member> | undefined ; 



 
 constructor(){
   const id: string = this.router.snapshot.params['id'];
    this.member$ = this.memberservice.getMemberById(id);
 }
 }

  




