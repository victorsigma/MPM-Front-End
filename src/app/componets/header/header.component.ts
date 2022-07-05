import { Component, OnInit } from '@angular/core';
import { LoginDataService } from '../../services/login-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin: boolean;
  constructor(private router:Router, public loginData:LoginDataService) {
    this.isLogin = this.loginData.isLogin;
  }

  ngOnInit(): void {
  }


  logout(): void {
    this.loginData.isLogin = false;
    this.updateLogin();
  }

  updateLogin(): void {
    this.isLogin = this.loginData.isLogin;
    this.router.navigate(['/reload']);
  }

  loginDate(): void {
    this.updateLogin();
  }
}