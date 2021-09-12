import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { delay } from 'rxjs/operators';
import { Main } from "../../../../tools/classes/main";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errMessage: string;
  isPending: boolean;
  constructor(private app: AppService) {

  }
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
    this.hideErrMessage();
  }
  submitLogin() {
    const { value } = this.loginForm;
    this.isPending = true;
    this.app.post('auth/login', value)
      .pipe(delay(2000))
      .subscribe((data: Main) => {
        if (data) {
          this.isPending = false;
          const { jwt, errMessage } = data;
          if (errMessage) {
            this.errMessage = errMessage;
          } else {
            this.errMessage = null;
            this.app.setJwt(jwt);
            this.app.goTo('/smarthouse');
          }
        }
     });
  }
  hideErrMessage() {
    if (this.loginForm) {
      this.loginForm.valueChanges.subscribe(data => {
        this.errMessage = null;
      });
    }
  }
}
