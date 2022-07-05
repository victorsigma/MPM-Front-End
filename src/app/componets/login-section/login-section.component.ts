import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginDataService } from '../../services/login-data.service';
import { UsersListService } from '../../services/users-list.service';
import { UserData } from '../../models/users';

@Component({
  selector: 'app-login-section',
  templateUrl: './login-section.component.html',
  styleUrls: ['./login-section.component.css']
})
export class LoginSectionComponent implements OnInit {

  isLogin: boolean = false;
  users: UserData[] = [];
  user: UserData = new UserData();
  form: FormGroup = new FormGroup({
    user: new FormControl(),
    password: new FormControl()
  });

  @Output() loginDate: EventEmitter<null> = new EventEmitter();
  constructor(private loginData:LoginDataService, private userList:UsersListService) { 
  }

  ngOnInit(): void {
  }

  isLoginDataTrue(): void {
    /*this.users = this.userList.usersList.filter((obj)=> {
      return obj.userId === this.form.get('user')?.value
    })
    this.user = this.users[0];
    console.log(this.userList.usersList)*/
    //if (this.user.userId == this.form.get('user')?.value && this.user.password == this.form.get('user')?.value) {
      this.loginData.isLogin = true;
      this.loginDate.emit()
    //}
  }
  isLoginDataFalse(): void {
    this.loginData.isLogin = false;
    this.loginDate.emit()
  }

  ngOnDestroy(): void {

  }
}
