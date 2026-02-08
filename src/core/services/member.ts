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
 accountService  = inject(Account)
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

}
