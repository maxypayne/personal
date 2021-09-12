import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ShopComponent } from './shop.component';
import { ShopHeaderComponent } from "./header/header.component";
import { InputsModule } from "../../tools/inputs/inputs.module";

const routes: Routes = [
  { path: '', component: ShopComponent, children: [
      { path: 'products',  loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
      { path: '**', redirectTo: 'products' },
    ]},
];

@NgModule({
  declarations: [
    ShopComponent,
    ShopHeaderComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    InputsModule,
  ],
  exports: [
    ShopComponent,
    ShopHeaderComponent,
  ],
})

export class ShopRoutingModule {}

