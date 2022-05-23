import { Component } from '@angular/core';
import { AppService } from "../../../../app.service";

@Component({
  selector: 'app-website-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class WebsiteContactComponent {
  data = {};
  check = {};
  fields = [];
  error: string;
  constructor(private app: AppService) { }
  handleChange({id, cleaned, checked}: any) {
    this.data[id] = cleaned;
    this.check[id] = checked;
  }
  async sendMessage() {
    this.error = null;
    const sent = await this.app.post('send/email', this.data).subscribe(data => { console.log(data)});
    console.log({sent})
    if (sent) {
      console.log('ok')
    } else {
      this.error = 'this is an error'
    }
  }
}
