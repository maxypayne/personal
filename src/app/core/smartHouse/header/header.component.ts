import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { Subscription } from 'rxjs';
import { User } from "../../../tools/interfaces/user";

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
