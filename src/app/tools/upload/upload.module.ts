import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';



@NgModule({
  declarations: [
    UploadComponent
  ],
  exports: [
    UploadComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UploadModule { }
