import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { AES } from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
import { LoginDataService } from '../../services/login-data.service';
import { UsersListService } from '../../services/users-list.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {

  formName: UntypedFormGroup = new UntypedFormGroup({
    userName: new UntypedFormControl(),
    userNameConfirm: new UntypedFormControl()
  })

  formEmail: UntypedFormGroup = new UntypedFormGroup({
    userEmail: new UntypedFormControl(),
    userEmailConfirm: new UntypedFormControl()
  })

  formPassword: UntypedFormGroup = new UntypedFormGroup({
    userPassword: new UntypedFormControl(),
    userPasswordConfirm: new UntypedFormControl()
  })
  constructor(public loginData: LoginDataService, private userList: UsersListService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }


  updateName() {
    if(!(/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(this.formName.get('userName')?.value))) {
      if (this.formName.get('userName')?.value === this.formName.get('userNameConfirm')?.value) {
        if (this.userList.usersList.filter(data => {
          return data.userName === this.formName.get('userNameConfirm')?.value
        }).length == 0) {
          //this.userList.usersList[this.userList.usersList.indexOf(this.loginData.usersList[0])].userName = this.formName.get('userNameConfirm')?.value;
          this.loginData.usersList[0].userName = this.formName.get('userNameConfirm')?.value;
  
          this.userList.updateUser(this.loginData.usersList[0].userId, this.loginData.usersList[0]).subscribe(data => {
            this.toastr.info('Successfully registered.', 'Operation Completed');
            this.reloadForms();
          })
        } else {
          this.reloadForms();
          this.toastr.error('Exists Username.', 'Operation Canceled');
        }
      } else {
        this.reloadForms();
        this.toastr.error('Incorrect data.', 'Operation Canceled');
      }
    } else {
      this.toastr.error('You cannot use an email address as a user.', 'Operation Canceled');
    }
  }

  updateEmail() {
    if (/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(this.formEmail.get('userEmail')?.value)) {
      if (this.formEmail.get('userEmail')?.value === this.formEmail.get('userEmailConfirm')?.value) {
        if (this.userList.usersList.filter(data => {
          return data.userMail === this.formEmail.get('userEmailConfirm')?.value
        }).length == 0) {
          //this.userList.usersList[this.userList.usersList.indexOf(this.loginData.usersList[0])].userMail = this.formEmail.get('userEmailConfirm')?.value;
          this.loginData.usersList[0].userMail = this.formEmail.get('userEmailConfirm')?.value;

          this.userList.updateUser(this.loginData.usersList[0].userId, this.loginData.usersList[0]).subscribe(data => {
            this.toastr.info('Successfully registered.', 'Operation Completed');
            this.reloadForms();
          })
        } else {
          this.toastr.error('Exists Email.', 'Operation Canceled');
        }
      } else {
        this.reloadForms();
        this.toastr.error('Incorrect data.', 'Operation Canceled');
      }
    } else {
      this.reloadForms();
      this.toastr.error('Incorrect data.', 'Operation Canceled');
    }
  }

  updatePassword() {
    if (this.formPassword.get('userPassword')?.value === this.formPassword.get('userPasswordConfirm')?.value) {
      //this.userList.usersList[this.userList.usersList.indexOf(this.loginData.usersList[0])].password = AES.encrypt(this.formPassword.get('userPasswordConfirm')?.value, this.userList.encryptionKey).toString();

      this.loginData.usersList[0].password = AES.encrypt(this.formPassword.get('userPasswordConfirm')?.value, this.userList.encryptionKey).toString();

      this.userList.updateUser(this.loginData.usersList[0].userId, this.loginData.usersList[0]).subscribe(data => {
        this.toastr.info('Successfully registered.', 'Operation Completed');
        this.reloadForms();
      })
    } else {
      this.reloadForms();
      this.toastr.error('Incorrect data.', 'Operation Canceled');
    }
  }

  reloadForms() {
    this.formName = new UntypedFormGroup({
      userName: new UntypedFormControl(),
      userNameConfirm: new UntypedFormControl()
    })

    this.formEmail = new UntypedFormGroup({
      userEmail: new UntypedFormControl(),
      userEmailConfirm: new UntypedFormControl()
    })

    this.formPassword = new UntypedFormGroup({
      userPassword: new UntypedFormControl(),
      userPasswordConfirm: new UntypedFormControl()
    })
  }
}
