import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from "../../../tools/interfaces/shop/product";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: Product = {};
  activeImg: string;
  quantity = 1;
  constructor() {}
  ngOnInit(): void {
    this.activeImg = !this.activeImg ? this.product.images[0].path : this.activeImg;
  }
  changeImg(id) {
    this.activeImg = id;
  }
  handleQuantity(value) {
    // check max quantity for products
    this.quantity += value === 'add' ? 1 : -1;
  }
}
