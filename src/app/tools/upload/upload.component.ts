import { Component, OnInit } from '@angular/core';
import { AppService } from "../../app.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  form: any;
  constructor(private app: AppService) { }
  ngOnInit(): void {}
  handleFile(data) {
    this.form = new FormData();
    console.log( data.target.files[0])
    this.form.append('avatar', data.target.files[0]);
  }
  send(){
    this.app.post('upload/file', this.form).subscribe((data)=> {
      console.log(data);
    })
  }
}
