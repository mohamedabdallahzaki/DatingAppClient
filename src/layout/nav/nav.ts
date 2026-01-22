import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Account } from '../../core/services/account';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Toast } from '../../core/services/toast';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountServie = inject(Account);
  protected router =inject(Router)
  protected toast = inject(Toast);
  protected creds: any = {};
  isMenuOpen = false;
  login() {
    this.accountServie.login(this.creds).subscribe({
      next: (res) => {
        console.log(res);

        this.toast.success('Logged success', 5000);
        this.router.navigateByUrl('/members')
        this.creds = {};
      },
      error: (err) => {
        console.log(err)
        this.toast.error(err.message, 4000);
      },
    });
  }

  logout() {
    this.accountServie.logout();
  }
}
