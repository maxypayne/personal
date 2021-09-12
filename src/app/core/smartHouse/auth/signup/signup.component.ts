import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errMessage: string;
  isPendingUsername: boolean;
  isPendingEmail: boolean;
  usernameId: any;
  emailId: any;
  constructor(private app: AppService) { }
  get controls() { return this.signupForm.controls; }

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl(null, [Validators.required], this.forbiddenUser.bind(this)),
      email: new FormControl(null, [Validators.required, Validators.email,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)], this.forbidenEmails.bind(this)),
      password: new FormControl(null),
    });
  }
  submitSignup() {
    console.log(this.signupForm);
    // const { value } = this.signupForm;
    // this.app.post('auth/signup', value).subscribe((data: Main) => {
    //   if (data) {
    //     const { message } = data;
    //     if (message) {
    //       this.app.goTo('/smarthouse/login');
    //     }
    //   }
    // });
  }
  forbiddenUser(control: FormControl) {
    clearTimeout(this.usernameId);
    console.log(this.controls);
    this.isPendingUsername = true;
    return new Promise((resolve, reject) => {
      this.usernameId = setTimeout(() => {
        console.log(control.value);
        this.app.post('users/checkUsername', { username: control.value})
          .pipe(delay(1000))
          .subscribe(data => {
            console.log(data);
            this.isPendingUsername = false;
            if (data && data['usernameExists']) {
              console.log('ree');
              resolve({ usernameExists: data['usernameExists'] });
            } else {
              resolve(null);
            }
          });
      }, 1000);
    });
  }
  forbidenEmails(control: FormControl): Promise<any> {
    clearTimeout(this.emailId);
    this.isPendingEmail = true;
    return new Promise((resolve, reject) => {
      this.emailId = setTimeout(() => {
        this.app.post('users/checkEmail', { email: control.value})
          .pipe(delay(1000))
          .subscribe(data => {
            console.log(data);
            this.isPendingEmail = false;
            if (data && data['emailExists']) {
              resolve({ emailExists: data['emailExists'] });
            } else {
              resolve(null);
            }
          });
      }, 1000);
    });
  }
}
