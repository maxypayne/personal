import { RouterModule, Routes } from "@angular/router";
import { ForkComponent } from "./fork.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ForkHomeComponent } from "./fork-home/fork-home.component";
import { ForkHeaderComponent } from "./fork-partials/fork-header/fork-header.component";
import { InputsModule } from "../../tools/inputs/inputs.module";

const routes: Routes = [
  { path: '', component: ForkComponent, children: [
      { path: 'home', component: ForkHomeComponent },
      { path: '**', redirectTo: '' },
    ]
  }
];

@NgModule({
  declarations: [
    ForkComponent,
    ForkHomeComponent,
    ForkHeaderComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    InputsModule,
  ],
  exports: [
    ForkComponent,
  ]
})

export class ForkRoutingModule {}
