import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  
  busyRequest = signal(0)

  busy(){
    this.busyRequest.update(current => current+1)
  }

  idel(){
    this.busyRequest.update(current => Math.max(0,current-1))
  }
}
