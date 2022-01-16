import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isOpen: boolean;
  menu = [
    { id: 'home', text: 'HOME' },
    { id: 'home', text: 'PORTFOLIO' },
    { id: 'home', text: 'HISTORY' },
    { id: 'home', text: 'BLOG' },
    { id: 'home', text: 'ONEPAGE' },
  ];
  active = 'HOME';
  constructor() { }
  ngOnInit(): void {}
  toogleMenu() {
    this.isOpen = !this.isOpen;
  }
  redirect(id) {
    this.active = id;
  }
}
