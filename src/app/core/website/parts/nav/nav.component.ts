import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from "../../../../app.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavComponent implements OnInit {
  isOpen: boolean;
  menu = [
    { id: 'home', text: 'HOME' },
    { id: 'home', text: 'PORTFOLIO' },
    { id: 'home', text: 'HISTORY' },
    { id: 'home', text: 'BLOG' },
    { id: 'contact', text: 'CONTACT' },
  ];
  active = 'HOME';
  constructor(private app: AppService) { }
  ngOnInit(): void {}
  toogleMenu() {
    this.isOpen = !this.isOpen;
  }
  redirect(id) {
    this.active = id;
    this.app.goTo(`/website/${id}`);
  }
}
