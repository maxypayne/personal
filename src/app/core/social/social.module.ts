import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialComponent } from './social.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: SocialComponent }];

@NgModule({
  declarations: [SocialComponent],
  imports: [
    [RouterModule.forChild(routes)],
    CommonModule,
  ],
  exports: [
    SocialComponent,
  ]
})
export class SocialModule { }
