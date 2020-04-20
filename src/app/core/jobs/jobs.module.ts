import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsComponent } from './jobs.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: JobsComponent }];

@NgModule({
  declarations: [ JobsComponent ],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)],
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [JobsComponent],
})
export class JobsModule { }
