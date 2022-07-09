import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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

  formName: FormGroup = new FormGroup({
    userName: new FormControl(),
    userNameConfirm: new FormControl()
  })

  formEmail: FormGroup = new FormGroup({
    userEmail: new FormControl(),
    userEmailConfirm: new FormControl()
  })

  formPassword: FormGroup = new FormGroup({
    userPassword: new FormControl(),
    userPasswordConfirm: new FormControl()
  })
  constructor(public loginData: LoginDataService, private userList: UsersListService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }


  updateName() {
    if(this.formName.get('userName')?.value === this.formName.get('userNameConfirm')?.value) {
      this.userList.usersList[this.userList.usersList.indexOf( this.loginData.usersList[0] )].userName = this.formName.get('userNameConfirm')?.value;
      this.toastr.success('Successfully registered.', 'Operation Completed');
      this.reloadForms();
    } else {
      this.reloadForms();
      this.toastr.error('Incorrect data.', 'Operation Canceled');
    }
  }

  updateEmail() {
    if(this.formEmail.get('userEmail')?.value === this.formEmail.get('userEmailConfirm')?.value) {
      this.userList.usersList[this.userList.usersList.indexOf( this.loginData.usersList[0] )].userMail = this.formEmail.get('userEmailConfirm')?.value;
      this.toastr.success('Successfully registered.', 'Operation Completed');
      this.reloadForms();
    } else {
      this.reloadForms();
      this.toastr.error('Incorrect data.', 'Operation Canceled');
    }
  }

  updatePassword() {
    if(this.formPassword.get('userPassword')?.value === this.formPassword.get('userPasswordConfirm')?.value) {
      this.userList.usersList[this.userList.usersList.indexOf( this.loginData.usersList[0] )].password = AES.encrypt(this.formPassword.get('userPasswordConfirm')?.value,this.userList.encryptionKey).toString();
      this.toastr.success('Successfully registered.', 'Operation Completed');
      this.reloadForms();
    } else {
      this.reloadForms();
      this.toastr.error('Incorrect data.', 'Operation Canceled');
    }
  }

  reloadForms() {
    this.formName = new FormGroup({
      userName: new FormControl(),
      userNameConfirm: new FormControl()
    })
  
    this.formEmail = new FormGroup({
      userEmail: new FormControl(),
      userEmailConfirm: new FormControl()
    })
  
    this.formPassword = new FormGroup({
      userPassword: new FormControl(),
      userPasswordConfirm: new FormControl()
    })
  }
}
