import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { Main } from '../../../tools/classes/main';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errMessage: string;
  constructor(private app: AppService) { }
  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl(null),
      email: new FormControl(null, [Validators.email]),
      password: new FormControl(null),
    });
  }
  submitSignup() {
    const { value } = this.signupForm;
    this.app.post('auth/signup', value).subscribe((data: Main) => {
      if (data) {
        const { message } = data;
        if (message) {
          this.app.goTo('/smarthouse/login');
        }
      }
    });
  }
}
