import { Component, EventEmitter, Input, input, Output, output, signal } from '@angular/core';

@Component({
  selector: 'app-upload-photo',
  imports: [],
  templateUrl: './upload-photo.html',
  styleUrl: './upload-photo.css',
})
export class UploadPhoto {
  protected imageSrc =  signal< string | ArrayBuffer | null | undefined> (null);
  protected isDragging = false;
  private fileToUpload : File | null = null;
 @Output() uploadFile = new EventEmitter<File>()
 @Input() loading :boolean = false;
  
  onDragOver(event:DragEvent){
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }
  
   onDragLeave(event:DragEvent){
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

   onDrop(event:DragEvent){
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    if(event.dataTransfer?.files.length ){
      const file = event.dataTransfer.files[0]
      this.previewImage(file)
    }
  }

  onCancel(){
    this.fileToUpload = null;
    this.imageSrc.set(null);
  }

  onUpload(){
    if(this.fileToUpload){
      this.uploadFile.emit(this.fileToUpload);
      this.loading = true
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.previewImage(file);
  }

  private previewImage(file:File){
    const reader = new FileReader();
    reader.onload = e => this.imageSrc.set(e.target?.result)
    reader.readAsDataURL(file);
    this.fileToUpload=file;
  }


}
