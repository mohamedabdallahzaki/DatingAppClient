import { Component, Directive, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Account } from '../../core/services/account';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Toast } from '../../core/services/toast';
import { themes } from './theme';
import { LoadingService } from '../../core/services/loading-service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountServie = inject(Account);
  protected LoadingService = inject(LoadingService)
  protected router =inject(Router)
  protected toast = inject(Toast);
  protected creds: any = {};

  protected selectedTheme = signal<string>(localStorage.getItem('theme') || 'light')
  protected themeList = themes

  changetheme(theme :string){
    this.selectedTheme.set(theme);
    localStorage.setItem('theme',theme);
    document.documentElement.setAttribute('data-theme',theme);
    const ele = document.activeElement as HTMLDivElement
    if(ele){
      ele.blur()
    }
   
  }



  isMenuOpen = false;
  login() {
    this.accountServie.login(this.creds).subscribe({
      next: (res) => {
        this.toast.success('Logged success', 5000);
        this.router.navigateByUrl('/members')
        this.creds = {};
      },
      error: (err) => {
        console.log(err)
      },
    });
  }

  logout() {
    this.accountServie.logout();
  }
}
