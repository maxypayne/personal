import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() active: string;
  menu = [
    {id: 'overview', text: 'Overview'},
    {id: 'devices', text: 'Devices'},
    {id: 'analytics', text: 'Analytics'},
    {id: 'rules', text: 'Rules'},
    {id: 'gallery', text: 'Gallery'},
    {id: 'history', text: 'History'},
    {id: 'settings', text: 'Settings'},
    ];
  hover: string;
  constructor(private app: AppService) { }
  ngOnInit() {
  }
  handleMenu(value) {
    this.active = value;
    this.app.goTo(`smarthouse/${value}`);
  }
  handleMouse(state, value?) {
    this.hover = state ? value : null;
  }
}
