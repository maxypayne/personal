import { NgModule } from '@angular/core';
import { NorenComponent } from './noren.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: NorenComponent }];


@NgModule({
  declarations: [NorenComponent],
  imports: [
    [RouterModule.forChild(routes)],
  ],
  exports: [NorenComponent],
})

export class NorenModule {}
