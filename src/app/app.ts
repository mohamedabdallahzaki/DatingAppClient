import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { Nav } from "../layout/nav/nav";
import { Account } from '../core/services/account';
import { HomePage } from '../features/home-page/home-page';
import { routes } from './app.routes';
import { NgClass } from '@angular/common';
import { Init } from '../core/services/init';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterOutlet, Nav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  initService = inject(Init)
  router = inject(Router)
  protected members = signal<any>([])
  constructor(private http:HttpClient){}
  ngOnInit(): void {

   lastValueFrom( this.initService.init());
  }


  
 

  title:string =  "Dating App";



}
