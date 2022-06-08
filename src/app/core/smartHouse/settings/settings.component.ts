import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { delay } from 'rxjs/operators';
import { AppService } from '../../../app.service';
interface General {
  message: string;
  errMessage: string;
}
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
  notifs = [
    {id: 'email', title: 'Email notifications', text: 'Recevive daily email notifications any time', status: 'off'},
    {id: 'phone', title: 'Phone notifications', text: 'Recevive daily sms notifications any time', status: 'on'},
    {id: 'encrypt', title: 'Encrypt data', text: 'Encrypt all data associeted with the account', status: 'on'},
    {id: 'update', title: 'Auto system update', text: 'Install the lattest update automatically', status: 'on'},
    {id: 'drive', title: 'Sync with g-drive', text: 'Save all your information on a cloud service', status: 'on'},
  ];
  otherSettings = [
    {id: 'color', title: 'Color Scheme', status: 'on'},
    {id: 'backup', title: 'Auto Backup', status: 'on'},
    {id: 'share', title: 'Share Analytics', status: 'off'},
    {id: 'shortcuts', title: 'Shortcuts', status: 'on'},
    {id: 'export', title: 'Export Data', status: 'on'},
  ];
  cards = [
    { brand: 'master', name: 'Brad Pitt', number: '6512 7489 286 9821', expire: '06/25' },
    { brand: 'visa', name: 'Gerard Butler', number: '3424 2135 2165 1732', expire: '04/24' },
    { brand: 'maestro', name: 'Russell Crowe', number: '7852 235 4657 6532', expire: '09/28' },
    { brand: 'visa', name: 'Hugh Jackman', number: '2354 3425 6779 7620', expire: '03/24' },
    { brand: 'maestro', name: 'Jimm Sturgess', number: '6758 3109 0945 7845', expire: '11/24' },
    { brand: 'master', name: 'Nick Nolte', number: '8956 3452 6592 5629', expire: '12/23' },
  ];
  activeChoice = 'login';
  form: UntypedFormGroup;
  passwordForm: UntypedFormGroup;
  passwordMessage: string;
  passwordId: any;
  isPendingPassword: boolean;
  isPassUpdated: boolean;
  constructor(private app: AppService) { }
  ngOnInit() {
    this.form = new UntypedFormGroup({
      username: new UntypedFormControl(null),
      email: new UntypedFormControl(null, [Validators.required, Validators.email,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
      tel: new UntypedFormControl(null),
    });
    this.passwordForm = new UntypedFormGroup({
      currentPassword: new UntypedFormControl(null, [Validators.required]),
      newPassword: new UntypedFormControl(null, [Validators.required]),
      comparePassword: new UntypedFormControl(null, [Validators.required]),
    } , {validators: this.checkPasswords.bind(this)});
  }
  checkPasswords() {
    if (this.passwordForm) {
      this.passwordMessage = null;
      const { newPassword, comparePassword} = this.passwordForm.value;
      const touched1 = this.passwordForm.get('newPassword').touched;
      const touched2 = this.passwordForm.get('comparePassword').touched;
      const isMatching = newPassword === comparePassword;
      this.passwordMessage = touched1 && touched2 && !isMatching ? 'New password and confirm new password doesn\'t matches' : null;
      return  isMatching ? true : { isMatching: false };
    }
    return { isMatching: false };
  }
  handleActive(value) {
    this.activeChoice = value;
  }
  updateInfos() {
    console.log(this.form);
  }
  updatePassword() {
    this.checkPasswords();
    const { currentPassword, newPassword, comparePassword } = this.passwordForm.value;
    if (currentPassword && newPassword && comparePassword && !this.passwordMessage) {
      if (currentPassword !== comparePassword) {
        this.isPendingPassword = true;
        this.app.post('auth/checkPassword', { currentPassword, newPassword, comparePassword})
          .pipe(delay(2000))
          .subscribe((data: General) => {
            const { message, errMessage } = data;
            if (message) {
              this.passwordMessage = message;
              this.isPassUpdated = true;
              setTimeout(() => {
                this.passwordForm.reset();
                this.isPassUpdated = false;
              }, 5000);
            } else if (errMessage) {
              this.passwordMessage = errMessage;
            }
            this.isPendingPassword = false;
          });
      } else {
        this.passwordMessage = 'Old password and new password are the same';
      }
    } else {
      this.passwordMessage = 'Please fill the form';
    }
  }
  // forbidenEmails(control: FormControl): Promise<any> | Observable<any> {
    // clearTimeout(this.emailId);
    // this.isPendingEmail = true;
    // return new Promise((resolve, reject) => {
    //   this.emailId = setTimeout(() => {
    //     this.app.post('users/checkEmail', { email: control.value})
    //       .pipe(delay(1000))
    //       .subscribe(data => {
    //         console.log(data);
    //         this.isPendingEmail = false;
    //         if (data && data['emailExists']) {
    //           resolve({ emailExists: data['emailExists'] });
    //         } else {
    //           resolve(null);
    //         }
    //       });
    //   }, 1000);
    // });
  // }
  addEmail() {
    this.form.patchValue({ email: 'maxim@gmail.com' });
    // this.form.setValue({email: 'maxim@gmail.com'});
  }
  changeStatus(index, status) {
    this.notifs[index].status = status === 'on' ? 'off' : 'on';
  }
  handleItem(index, status) {
    this.otherSettings[index].status = status;
  }
}
