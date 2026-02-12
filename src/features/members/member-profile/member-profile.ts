import { Component, HostListener, inject, OnDestroy, OnInit, signal, ViewChild, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditableMember, member } from '../../../types/member';
import { DatePipe, SlicePipe } from '@angular/common';
import {  MemberService } from '../../../core/services/member';
import { Toast } from '../../../core/services/toast';
import { FormsModule, NgForm,NgModel } from '@angular/forms';
import { Account } from '../../../core/services/account';

@Component({
  selector: 'app-member-profile',
  imports: [DatePipe,FormsModule ],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css',
})
export class MemberProfile implements OnInit ,OnDestroy{
@ViewChild('editForm') editForm?:NgForm ;
@HostListener('window:beforeunload', ['$event'])
notify(event: BeforeUnloadEvent) {
  if (this.editForm?.dirty) {
    event.preventDefault();
  }
}

protected accountService = inject(Account)
 protected memberService = inject(MemberService)
 
 private tosat = inject(Toast)
 protected editableMember!: EditableMember;
 


  ngOnInit(): void {
  
    this.editableMember = {
      description:this.memberService.member()?.description|| '',
      displayName : this.memberService.member()?.displayName || '',
      city: this.memberService.member()?.city || '',
      country : this.memberService.member()?.country ||''
    }
  }

updateProfile(){
    if(!this.editableMember) return; 
    const updateMember = {...this.memberService.member(),...this.editableMember}
   const currentUser = this.accountService.currentUser();
if (currentUser && updateMember.displayName && currentUser.displayName !== updateMember.displayName) {
  currentUser.displayName = updateMember.displayName;
}
    
    this.memberService.updateMember(updateMember).subscribe({
      next: () =>{
        this.tosat.success("update Member ",2)
        this.memberService.editMode.set(false)
        this.memberService.member.set(updateMember as member)
        this.editForm?.reset(updateMember)

      }
    })

    

  }
 
  ngOnDestroy(): void {
    if(this.memberService.editMode() == true){
      this.memberService.editMode.set(false)
    }
  }

}
