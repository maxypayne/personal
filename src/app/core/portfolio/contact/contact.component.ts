import { Component, ViewEncapsulation } from '@angular/core';
import { AppService } from "../../../app.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['contact.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class PortfolioContactComponent {
  data = {};
  constructor(private app: AppService) {
  }
  handleChange(action) {
    const { id, cleaned } = action;
    this.data[id] = cleaned;
  }
  sendMessage() {
    this.app.post('message/new', this.data).subscribe(data => {
      console.log({data});
    });
  }
}
