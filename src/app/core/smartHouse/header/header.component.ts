import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../app.service';
import { User } from '../../tools/interfaces/user';

@Component({
  selector: 'app-smart-house-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class SmartHouseHeaderComponent implements OnInit {
  active: string;
  user: User = {};
  constructor(private app: AppService) {
    this.user = app.user;
  }
  ngOnInit() {
  }
  handleMenu(value) {
    this.active = value;
  }
}
