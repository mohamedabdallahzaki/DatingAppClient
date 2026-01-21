import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Toast {
  
  constructor(){
    this.createToastContainer();
  }

  createToastContainer(){
    if(!document.getElementById("toast-container")){
     const container = document.createElement("div")
     container.id= "toast-container"
     container.className = "toast toast-end text-center mr-2 fixed right-0 z-100"
     document.body.appendChild(container)
    }
  }

  createElementToToast(message:string,alertClass:string,duration:number = 5000){
    const toastContaniner = document.getElementById("toast-container")

    if(!toastContaniner) return ;

    const toast = document.createElement("div");

    toast.classList.add("alert",alertClass,"shadow-lg")

    toast.innerHTML= `
     <span>${message}</span>
     <button class=" ml-4 btn btn-sm btn-ghost ">x</button>
    `
    toast.querySelector("button")?.addEventListener("click",()=>{
      toastContaniner.removeChild(toast)
    })

    toastContaniner.appendChild(toast);

    setTimeout(() => {
      if(toastContaniner.contains(toast)){
        toastContaniner.removeChild(toast)
      }
    }, duration);


  }

  success(message:string,duration:number){
    this.createElementToToast(message,"alert-success",duration);
  }
    error(message:string,duration:number){
    this.createElementToToast(message,"alert-error",duration);
  }
    warning(message:string,duration:number){
    this.createElementToToast(message,"alert-warning",duration);
  }
    info(message:string,duration:number){
    this.createElementToToast(message,"alert-info",duration);
  }

}
