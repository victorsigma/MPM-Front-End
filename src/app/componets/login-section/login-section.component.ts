import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginDataService } from '../../services/login-data.service';

@Component({
  selector: 'app-login-section',
  templateUrl: './login-section.component.html',
  styleUrls: ['./login-section.component.css']
})
export class LoginSectionComponent implements OnInit {

  isLogin: boolean = false;
  form: FormGroup = new FormGroup({});

  @Output() loginDate: EventEmitter<null> = new EventEmitter();
  constructor(private loginData:LoginDataService) { 
  }

  ngOnInit(): void {
  }

  isLoginDataTrue(): void {
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
