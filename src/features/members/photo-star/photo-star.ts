import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-photo-star',
  imports: [],
  templateUrl: './photo-star.html',
  styleUrl: './photo-star.css',
})
export class PhotoStar {
  @Input() selected : boolean | undefined = undefined;
  @Input() disabled : boolean = false;

  @Output() clicked = new EventEmitter<Event>();

  onClick($event:Event){
    if(! this.disabled ){
    this.clicked.emit($event);
  }
}
}
