import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AppService } from '../../../app.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactiveForms.component.html',
  styleUrls: ['reactiveForms.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReactiveFormsComponent implements OnInit, OnDestroy {
  form: FormGroup;
  forbiddenUsers = ['Ana', 'maxim'];
  emailId: any;
  usernameId: any;
  pendingSub: Subscription;
  isPending: boolean;
  isPendingEmail: boolean;
  isPendingUsername: boolean;
  passwordIsValid: boolean;
  showSelectList: boolean;
  constructor(private app: AppService) {
  }
  ngOnDestroy(): void {
    this.pendingSub.unsubscribe();
  }
  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required], this.forbiddenUser.bind(this)),
      email: new FormControl(null, [Validators.required, Validators.email,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)], this.forbidenEmails.bind(this)),
      password: new FormControl(null, [Validators.required]),
      car: new FormControl('Choose a car', [Validators.required]),
      hobbies: new FormArray([]),
    });
    if (this.form) {
      this.pendingSub = this.form.statusChanges.subscribe(result => {
          console.log(result);
          this.isPending = result === 'PENDING';
        }
      );
    }
  }
  handleFormData() {
    console.log(this.form);
    const { username, email, password, hobbies } = this.form.value;
    this.app.post('users/create', { email, username, password, hobbies}).subscribe(data => {
      console.log(data);
    });
  }
  addHobbies() {
    const hobby = new FormControl(null);
    (this.form.get('hobbies') as FormArray).push(hobby);
  }
  deleteHobby(index) {
    const hobby = new FormControl(null);
    (this.form.get('hobbies') as FormArray).removeAt(index);
  }
  forbiddenUser(control: FormControl) {
    clearTimeout(this.usernameId);
    this.isPendingUsername = true;
    return new Promise((resolve, reject) => {
      this.usernameId = setTimeout(() => {
        console.log(control.value);
        this.app.post('users/checkUsername', { username: control.value})
          .pipe(delay(1000000))
          .subscribe(data => {
            console.log(data);
            // this.isPendingUsername = false;
            if (data && data['usernameExists']) {
              console.log('ree');
              resolve({ usernameExists: data['usernameExists'] });
            } else {
              resolve(null);
            }
          });
      }, 1000);
    });
    // @ts-ignore
    // if (this.forbiddenUsers.includes(control.value)) {
    //   return { forbiddenUser: true };
    // }
    // return null;
  }
  forbidenEmails(control: FormControl): Promise<any> | Observable<any> {
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
  forbidenEmails2(control: FormControl): Promise<any> | Observable<any> {
    // clearTimeout(this.requestId);
    // this.requestId = setTimeout(() => {
    return new Observable((observble) => {
      this.app.post('users/checkUser', { email: control.value})
        .pipe(delay(3000))
        .subscribe(data => {
          if (data) {
            observble.next({ userExists: true });
          } else {
            observble.next({ userExists: false });
          }
        });
    });
    // }, 1000);
    // return;
  }
  // loginAsyncValidator(authService: AuthService, time: number = 500) {
  //   return (input: FormControl) => {
  //     return timer(time).pipe(
  //       switchMap(() => authService.checkLogin(input.value)),
  //       map(res => {
  //         return res.isLoginAvailable ? null : {loginExist: true}
  //       })
  //     );
  //   };
  // };
  passwordValid(value) {
    this.passwordIsValid = value;
    console.log(value);
  }
}
