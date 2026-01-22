import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiExcpection } from '../../../../types/ApiExcpection';

@Component({
  selector: 'app-server-error',
  imports: [],
  templateUrl: './server-error.html',
  styleUrl: './server-error.css',
})
export class ServerError {
  private router = inject(Router);
  protected error:ApiExcpection |null = null

  protected showDetails = false;

  constructor(){
    const navigation = this.router.getCurrentNavigation(  )
    this.error = navigation?.extras?.state?.['error']


  }

  showdetails(){
    this.showDetails = !this.showDetails
  }


}
