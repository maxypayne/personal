import { Component, OnInit } from '@angular/core';
import { AppService } from "../../../app.service";

@Component({
  selector: 'app-shop-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class ShopHeaderComponent implements OnInit {
  links = [
    {id: 'home', text: 'Home'},
    {id: 'about', text: 'About'},
    {id: 'service', text: 'Service'},
    {id: 'blog', text: 'Blog'},
    {id: 'contact', text: 'Contact'},
  ];
  constructor(private app: AppService) {
  }
  ngOnInit(): void {}
  handleLink(value: string) {
    this.app.goTo(`/portfolio/${value}`)
  }
}
