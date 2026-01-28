import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginCreds, RegisterCreds, User } from '../../types/user';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Account } from '../../core/services/account';
import { member } from '../../types/member';

@Injectable({
  providedIn: 'root',
})
export class Member {
  protected http = inject(HttpClient);
 private baseUrl = environment.baseUrl
 accountService  = inject(Account)
 
 getMembers(){
    return this.http.get<member[]>(this.baseUrl + 'members')
 }

 getMemberById(id:string){
     return this.http.get<member>(`${this.baseUrl}members/${id}`);
 }


 

}
