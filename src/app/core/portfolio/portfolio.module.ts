import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from './portfolio.component';
import { PortfolioHeaderComponent } from "./header/portfolioHeader.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { PortfolioContactComponent } from "./contact/contact.component";
import { PortfolioHomeComponent } from "./home/home.component";
import { InputsModule } from "../../tools/inputs/inputs.module";

const routes: Routes = [
  { path: '', component: PortfolioComponent, children: [
      { path: 'home', component: PortfolioHomeComponent },
      { path: 'contact', component: PortfolioContactComponent },
      { path: '**', redirectTo: 'home' }
    ],
  },
];
@NgModule({
  declarations: [
    PortfolioComponent,
    PortfolioHeaderComponent,
    PortfolioContactComponent,
    PortfolioHomeComponent,
  ],
    imports: [
        [RouterModule.forChild(routes)],
        CommonModule,
        FormsModule,
        InputsModule,
    ],
  exports: [
    PortfolioComponent,
    PortfolioHeaderComponent,
    PortfolioContactComponent,
    PortfolioHomeComponent,
    FormsModule,
    CommonModule,
  ]
})

export class PortfolioModule {}
