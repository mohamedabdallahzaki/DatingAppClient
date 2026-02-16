import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginCreds, RegisterCreds, User } from '../../types/user';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Account } from '../../core/services/account';
import { EditableMember, member, photo } from '../../types/member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  protected http = inject(HttpClient);
  private baseUrl = environment.baseUrl
  member = signal<member | null>(null)
  editMode = signal(false);

 
 getMembers(){
    return this.http.get<member[]>(this.baseUrl + 'members')
 }

 getMemberById(id:string){
     return this.http.get<member>(`${this.baseUrl}members/${id}`).pipe(
      tap(member =>{
        this.member.set(member)
      } )
     )
 }

 getMemberPhotos(id:string){
   return this.http.get<photo[]>(`${this.baseUrl}members/${id}/photos`)
 }

 updateMember(editMember:EditableMember){
  return this.http.put (this.baseUrl+"members",editMember)
 }

 uploadPhoto(file:File){
  const formData = new FormData();
  formData.append('file',file);
  return this.http.post<photo>(this.baseUrl+'members/add-photo' , formData)
 }

 SetMainPhoto(photo:photo){
  return this.http.post(this.baseUrl+'members/set-main-photo/'+ photo.id ,{})
 }

 deletePhoto(photoId:number){
  return this.http.delete(this.baseUrl+'members/delete-photo/'+photoId)
 }

}
