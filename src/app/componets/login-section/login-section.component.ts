import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginDataService } from '../../services/login-data.service';
import { UsersListService } from '../../services/users-list.service';

@Component({
  selector: 'app-login-section',
  templateUrl: './login-section.component.html',
  styleUrls: ['./login-section.component.css']
})
export class LoginSectionComponent implements OnInit {

  isLogin: boolean = false;
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
    this.userList.usersList.filter((obj)=> {
      return obj.userId == this.form.get('user')?.value && obj.password == this.form.get('user')?.value
    })
    this.loginData.isLogin = true;
    this.loginDate.emit()
  }
  isLoginDataFalse(): void {
    this.loginData.isLogin = false;
    this.loginDate.emit()
  }

  ngOnDestroy(): void {

  }
}
