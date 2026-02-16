import { Component, effect, inject, signal } from '@angular/core';
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

  private readonly validThemes = new Set(themes);
  protected selectedTheme = signal<string>(this.getInitialTheme())
  protected themeList = themes

  constructor() {
    effect(() => {
      const theme = this.selectedTheme();
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    });
  }

  isSelectedTheme(theme: string) {
    return this.selectedTheme() === theme;
  }

  changetheme(theme :string){
    this.selectedTheme.set(theme);
    const ele = document.activeElement as HTMLDivElement
    if(ele){
      ele.blur()
    }
   
  }

  private getInitialTheme(): string {
    const storedTheme = localStorage.getItem('theme');
    if (!storedTheme) return 'light';

    // Support a common typo persisted in local storage.
    if (storedTheme === 'drak') return 'dark';

    return this.validThemes.has(storedTheme) ? storedTheme : 'light';
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
