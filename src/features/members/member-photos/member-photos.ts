import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { photo } from '../../../types/member';
import { MemberService } from '../../../core/services/member';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-member-photos',
  imports: [],
  templateUrl: './member-photos.html',
  styleUrl: './member-photos.css',
})
export class MemberPhotos implements OnInit {
 private ActivatedRoute= inject(ActivatedRoute)
 
 private memberService = inject(MemberService)

 protected memberPhotos = signal<photo[] | undefined>(undefined)

  ngOnInit(): void {
    const id :string = this.ActivatedRoute.parent?.snapshot.paramMap.get('id') ?? "";
    this.memberService.getMemberPhotos(id).subscribe({
      next : res =>{   
        this.memberPhotos.set(res)
      }
    })
   
 
};
get photoMocks() {
  return Array.from({ length: 20 }, (_, i) => ({ url: '/user.png' }));
}

}





