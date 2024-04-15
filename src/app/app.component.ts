import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoginDataService } from './services/login-data.service';
import { ToastrService } from 'ngx-toastr';
import { LogoutService } from './services/logout.service';
import { Modal } from 'bootstrap';
import { LangService } from './services/lang.service';
import { Lang } from './models/lang';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MPM-Front-End';

  public isMobile: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver, private loginService: LoginDataService, private langService: LangService, private logoutService: LogoutService) {
    if(this.loginService.isLogin()) {
      localStorage.setItem('theme', this.loginService.getUserInfo().selectedTheme)
      document.body.setAttribute('data-bs-theme', this.loginService.getUserInfo().selectedTheme)
    } else {
      document.body.setAttribute('data-bs-theme', localStorage.getItem('theme') ? `${localStorage.getItem('theme')}` : 'default')
    }
    this.breakpointObserver.observe('(max-width: 992px)')
    .subscribe(result => {
      this.isMobile = result.matches;
    });
  }
}
