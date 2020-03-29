import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsComponent } from './jobs.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: JobsComponent }];

@NgModule({
  declarations: [ JobsComponent ],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)],
  ],
  exports: [JobsComponent],
})
export class JobsModule { }
