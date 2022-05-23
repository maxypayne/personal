import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebsiteComponent } from './website.component';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { InputsModule } from "../../tools/inputs/inputs.module";
import { WebsiteHomeComponent} from './components/home/home.component';
import {SidebarModule} from "./parts/sidebar/sidebar.module";
import {NavModule} from "./parts/nav/nav.module";
import { WebsiteContactComponent } from './components/contact/contact.component';
import { WebsitePartsComponent } from './components/parts/parts.component';
import { UploadModule } from "../../tools/upload/upload.module";

const routes: Routes = [
  { path: '', component: WebsiteComponent, children: [
      { path: 'home', component: WebsiteHomeComponent },
      { path: 'contact', component: WebsiteContactComponent },
      { path: 'parts', component: WebsitePartsComponent },
      // { path: 'contact', component: PortfolioContactComponent },
      { path: '**', redirectTo: 'home' }
    ],
  },
];
@NgModule({
  declarations: [
    WebsiteComponent,
    WebsiteHomeComponent,
    WebsiteContactComponent,
    WebsitePartsComponent,
  ],
  imports: [
    [RouterModule.forChild(routes)],
    CommonModule,
    FormsModule,
    InputsModule,
    SidebarModule,
    NavModule,
    UploadModule,
  ],
  exports: [
    WebsiteComponent,
    FormsModule,
    CommonModule,
  ]
})

export class WebsiteModule {}
