import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PortofolioComponent } from './portofolio.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: PortofolioComponent },
  { path: 'contact', pathMatch: 'full', component: ContactComponent },
];
@NgModule({
  declarations: [
    PortofolioComponent,
    ContactComponent,
  ],
  imports: [
    [RouterModule.forChild(routes)],
    CommonModule,
  ],
  exports: [PortofolioComponent]
})

export class PortofolioModule {}
