import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsiteSidebarComponent } from './sidebar.component';



@NgModule({
  declarations: [
    WebsiteSidebarComponent
  ],
  exports: [
    WebsiteSidebarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SidebarModule { }
