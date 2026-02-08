import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {  MemberService } from '../../../core/services/member';
import { ActivatedRoute, RouterLinkActive, RouterLink, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { member } from '../../../types/member';
import { AsyncPipe, CommonModule } from '@angular/common';
import { PipeagePipe } from '../../../app/src/core/pipeage-pipe';
import { Account } from '../../../core/services/account';

@Component({
  selector: 'app-members-detalied',
  imports: [ CommonModule, RouterLink,RouterLinkActive,RouterOutlet ,PipeagePipe],
  templateUrl: './members-detalied.html',
  styleUrl: './members-detalied.css',
})
export class MembersDetalied {
  
  protected memberservice =inject(MemberService)
  routerActivated = inject(ActivatedRoute)
  accountService = inject(Account)
  router = inject(Router)
  title =  signal<string | undefined>("Profile");
  isCurrentUser = computed(() => {
    return this.accountService.currentUser()?.id === this.routerActivated.snapshot.paramMap.get('id')
  })



 
 constructor(){
 
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe({
      next: () =>{
        this.title.set(this.routerActivated.firstChild?.snapshot.title )
      }
    })

    
 }
 }

  




