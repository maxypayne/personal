import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { Main } from '../../../tools/classes/main';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errMessage: string;
  constructor(private app: AppService) { }
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }
  submitLogin() {
    console.log(this.loginForm.valid);
    const { value } = this.loginForm;
    this.app.post('auth/login', value).subscribe((data: Main) => {
      if (data) {
        const { jwt, email, errMessage } = data;
        if (errMessage) {
          this.errMessage = errMessage;
        } else {
          this.errMessage = null;
          this.app.setUser({ jwt, email });
          this.app.goTo('/smarthouse');
        }
      }
      console.log(data);
    });
  }
}
