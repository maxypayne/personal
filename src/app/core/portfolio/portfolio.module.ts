import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PortfolioComponent } from "./portfolio.component";
import { InputsModule } from "../../tools/inputs/inputs.module";

const routes: Routes = [{ path: '', component: PortfolioComponent }];

@NgModule({
  declarations: [PortfolioComponent],
  imports: [
    [RouterModule.forChild(routes)],
    CommonModule,
    InputsModule,
  ],
  exports: [PortfolioComponent]
})

export class PortfolioModule {}
