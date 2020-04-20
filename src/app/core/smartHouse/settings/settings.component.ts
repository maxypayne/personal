import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  choices = [
    {
      id: 'login',
      title: 'Login & Security',
      text: 'Brief description of lomre ipsum dolor sit amet, consectetur adisciplining elit, sed eiusmod',
    },
    {
      id: 'payement',
      title: 'Payement options',
      text: 'Brief description of lomre ipsum dolor sit amet, consectetur adisciplining elit, sed eiusmod',
    },
    {
      id: 'devices',
      title: 'Your devices',
      text: 'Brief description of lomre ipsum dolor sit amet, consectetur adisciplining elit, sed eiusmod',
    }
  ];
  activeChoice = 'login';
  form: FormGroup;
  constructor() { }
  ngOnInit() {
    this.form = new FormGroup({

    });
  }
  handleActive(value) {
    this.activeChoice = value;
  }
  updateInfos() {}
  changePassword() {}
  comparePassword() {}
}
