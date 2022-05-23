import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxjstutoComponent } from './rxjstuto.component';
import { RouterModule, Routes } from "@angular/router";
import { PipesModule } from "../../tools/pipes/pipes.module";
import { DirectivesModule } from "../../tools/directives/directives.module";


const routes: Routes = [
  { path: '', component: RxjstutoComponent }
];

@NgModule({
  declarations: [
    RxjstutoComponent
  ],
  imports: [
    [RouterModule.forChild(routes)],
    CommonModule,
    PipesModule,
    DirectivesModule
  ]
})
export class RxjstutoModule { }
