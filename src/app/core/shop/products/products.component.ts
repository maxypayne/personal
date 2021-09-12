import { Component, OnInit } from '@angular/core';
import { AppService } from "../../../app.service";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";
import { Product } from "../../../tools/interfaces/shop/product";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  params$: Subscription;
  params: Params = {};
  products: Array<Product> = [];
  toggle: boolean;
  hasId: boolean;
  product: Product = {};
  wait: boolean;
  constructor(private app: AppService, private route: ActivatedRoute) {
    this.params$ = route.queryParams.subscribe(p => this.handleParams(p));
  }
  ngOnInit(): void {
    this.wait = true;
    this.app.get('shop/products').subscribe((data: any) => {
      if (data && data.products) {
        this.products = data.products;
        const { id } = this.params;
        if (id && this.products.filter(x => x.id === id).length) {
          this.product = this.products.filter(x => x.id)[0];
          console.log(this.product)
          this.hasId = true;
        }
        this.wait = false;
      }
    });
  }
  handleParams(params) {
    this.hasId = false;
    this.params = params;
    const { id } = params;
    if (id && this.products.filter(x => x.id === id).length) {
      this.product = this.products.filter(x => x.id)[0];
      this.hasId = true;
    }
  }
  goTo(id) {
    this.app.goTo('/shop/products', { id });
  }
  handleId(id) {
    console.log({id});
  }
}
