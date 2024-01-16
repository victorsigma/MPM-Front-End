import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { AES, enc } from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
import { LoginDataService } from '../../services/login-data.service';
import { UsersListService } from '../../services/users-list.service';
import { UserData } from '../../models/users';
import { ProjectListService } from '../../services/project-list.service';

@Component({
  selector: 'app-login-section',
  templateUrl: './login-section.component.html',
  styleUrls: ['./login-section.component.css']
})
export class LoginSectionComponent implements OnInit {

  isLogin: boolean = false;
  users: UserData[] = [];
  form: UntypedFormGroup = new UntypedFormGroup({
    user: new UntypedFormControl(),
    password: new UntypedFormControl()
  });

  @Output() loginDate: EventEmitter<null> = new EventEmitter();
  constructor(private loginData: LoginDataService, private userList: UsersListService, private toastr: ToastrService, private projectList: ProjectListService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  isLoginDataTrue(): void {
    if (/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(this.form.get('user')?.value)){
      this.users = this.userList.usersList.filter((obj) => {
        return obj.userMail == this.form.get('user')?.value
      })
      if (this.users[0] != undefined) {
        if (AES.decrypt(this.users[0].password,this.userList.encryptionKey).toString(enc.Utf8) == this.form.get('password')?.value) {
          this.loggingUser();
        } else {
          this.toastr.error('Incorrect data connection error.', 'Operation Canceled');
        }
      } else {
        this.toastr.error('Incorrect data connection error.', 'Operation Canceled');
      }
    } else {
      this.users = this.userList.usersList.filter((obj) => {
        return obj.userName == this.form.get('user')?.value
      })
      if (this.users[0] != undefined) {
        if (AES.decrypt(this.users[0].password,this.userList.encryptionKey).toString(enc.Utf8) == this.form.get('password')?.value) {
          this.loggingUser();
        } else {
          this.toastr.error('Incorrect data connection error.', 'Operation Canceled');
        }
      } else {
        this.toastr.error('Incorrect data connection error.', 'Operation Canceled');
      }
    }
    this.reloadForm();
  }
  isLoginDataFalse(): void {
    this.loginData.isLogin = false;
    this.loginDate.emit()
  }

  ngOnDestroy(): void {

  }


  reloadForm() {
    this.form = new UntypedFormGroup({
      user: new UntypedFormControl(),
      password: new UntypedFormControl()
    });
  }

  loggingUser() {
    this.toastr.success('Successfully logged.', 'Operation Completed');
    this.loginData.isLogin = true;
    this.loginData.usersList = this.users;
    this.loginDate.emit();
    this.projectList.loadProjects();
  }

  getUsers() {
    this.userList.getList();
  }
}