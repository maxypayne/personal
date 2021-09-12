import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from "./products.component";
import { RouterModule, Routes } from "@angular/router";
import { ProductComponent } from "../product/product.component";
import { SpinnerModule } from "../../../tools/spinner/spinner.module";
import { InputsModule } from "../../../tools/inputs/inputs.module";

const routes: Routes = [{ path: '', component: ProductsComponent }];

@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SpinnerModule,
    InputsModule
  ],
  exports: [
    ProductsComponent,
    ProductComponent,
  ]
})

export class ProductsModule { }
