import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { member, photo } from '../../../types/member';
import { MemberService } from '../../../core/services/member';
import { UploadPhoto } from "../upload-photo/upload-photo";
import { Account } from '../../../core/services/account';
import { User } from '../../../types/user';
import { PhotoStar } from "../photo-star/photo-star";
import { ButtonDeletePhoto } from "../button-delete-photo/button-delete-photo";

@Component({
  selector: 'app-member-photos',
  imports: [UploadPhoto, PhotoStar, ButtonDeletePhoto],
  templateUrl: './member-photos.html',
  styleUrl: './member-photos.css',
})
export class MemberPhotos implements OnInit {
 private ActivatedRoute= inject(ActivatedRoute)
 accountService = inject(Account)
 protected memberService = inject(MemberService)
 protected loading = signal(false);
 protected memberPhotos = signal<photo[] | undefined>(undefined)

  ngOnInit(): void {
    const id :string = this.ActivatedRoute.parent?.snapshot.paramMap.get('id') ?? "";
    this.memberService.getMemberPhotos(id).subscribe({
      next : res =>{   
        this.memberPhotos.set(res)
      }
    })
    }


  uploadImage(file:File){
    this.memberService.uploadPhoto(file).subscribe({
      next: photo =>{
        this.memberService.editMode.set(false);
        this.loading.set(false)
        this.memberPhotos.update(memberPhotos => [...(memberPhotos ?? []), photo])

        if(!this.memberService.member()?.imageUrl){
          this.setphotoLocal(photo);
        
        }
         

      },
      error: err => {
        this.loading.set(false);
        this.memberService.editMode.set(false)
        console.log(err)
      }
    })
  }

  setPhoto(photo:photo){
    this.memberService.SetMainPhoto(photo).subscribe({
      next: () =>{
     this.setphotoLocal(photo);
    }})
  
}

deletePhoto(photoId:number){
  this.memberService.deletePhoto(photoId).subscribe({
    next: () =>{
      this.memberPhotos.update(photos => photos?.filter(x => x.id !=photoId))
    }
  })
}

private setphotoLocal(photo:photo){
   const currentUser = this.accountService.currentUser()

        if(currentUser){
          currentUser.imageUrl = photo.imageUrl
        }
        this.accountService.setCurrentUser(currentUser as User);
        this.memberService.member.update( member => ({
          ...member,
          imageUrl:photo.imageUrl
        }) as member)

}

}







