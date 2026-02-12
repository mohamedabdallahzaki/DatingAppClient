import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-delete-photo',
  imports: [],
  templateUrl: './button-delete-photo.html',
  styleUrl: './button-delete-photo.css',
})
export class ButtonDeletePhoto {

  @Input() disabled : boolean = false;
  @Input() selected : boolean = false;
  @Output() clickedToDeleted = new EventEmitter<Event>()

  onclicked(event:Event){
    this.clickedToDeleted.emit(event)
  }
  
}
