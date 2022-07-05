import { Component, OnInit } from '@angular/core';
import { LoginDataService } from '../../services/login-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLogin: boolean;
  constructor(public loginData: LoginDataService) { 
    this.isLogin = this.loginData.isLogin;
  }

  ngOnInit(): void {
    
  }

}
