import { Component } from '@angular/core';
import { LoginDataService } from 'src/app/services/login-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  public iconPathFull: string = `${environment.apiKey}api/user-icon/full/`
  public userIcon: string = '';
  public userName: string =  '';

  constructor(public loginService:LoginDataService) {
    
  }

  ngOnInit(): void {
    this.userIcon = `${this.loginService.getUserInfo().userIcon}.jpg`;
    this.userName = this.loginService.getUserInfo().userName;
  }
}
