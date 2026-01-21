import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { Nav } from "../layout/nav/nav";
import { Account } from '../core/services/account';
import { HomePage } from '../features/home-page/home-page';
import { routes } from './app.routes';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterOutlet, Nav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  accountService = inject(Account)
  router = inject(Router)
  protected members = signal<any>([])
  constructor(private http:HttpClient){}
  ngOnInit(): void {
    this.http.get("https://localhost:5001/api/members").subscribe({
      next: members => this.members.set(members),
      error: err => console.log(err),
      complete: () => console.log("ok")
    })
    this.setCurrentUser();
  }

  setCurrentUser(){
    const userString = localStorage.getItem("user")  ;
    if(!userString) return;

    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  
  }

  title:string =  "Dating App";



}
