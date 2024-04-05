import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { LoginDataService } from './services/login-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MPM-Front-End';

  public isMobile: boolean = false;
  constructor(private breakpointObserver: BreakpointObserver, private loginService: LoginDataService, private toastr: ToastrService) {
    this.loginService.verifyLogin().subscribe({
      next: (data) => {
        if(!data.value) {
          this.loginService.loggout();
        }
      }
    })
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
