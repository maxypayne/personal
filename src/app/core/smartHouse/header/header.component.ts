import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../app.service';
import { User } from '../../tools/interfaces/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-smart-house-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class SmartHouseHeaderComponent implements OnInit {
  active: string;
  userSubsc: Subscription;
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
