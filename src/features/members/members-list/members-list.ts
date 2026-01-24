import { Component, inject } from '@angular/core';
import { Member } from '../../../core/services/member';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { member } from '../../../types/member';
import { MemberCard } from "../member-card/member-card";

@Component({
  selector: 'app-members-list',
  imports: [AsyncPipe, MemberCard],
  templateUrl: './members-list.html',
  styleUrl: './members-list.css',
})
export class MembersList {
  private memberService = inject(Member)

   members$ : Observable<member[]> ;

  constructor(){
    this.members$=this.memberService.getMembers()
  }

}
