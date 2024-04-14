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

  @ViewChild('logoutModal', { static: false }) private logoutModalRef !: ElementRef;
  private logoutModal: Modal | null = null;
  public lang: Lang = new Lang();
  constructor(private breakpointObserver: BreakpointObserver, private loginService: LoginDataService, private langService: LangService, private logoutService: LogoutService) {
    this.lang = this.langService.getLang();
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

  ngOnInit(): void {
    this.logoutService.getInactivityEvent().subscribe(() => {
      // Lógica para mostrar el modal de cierre de sesión
      this.showLogoutModal();
    });
  }

  ngAfterViewInit(): void {
    this.logoutModal = new Modal(this.logoutModalRef.nativeElement);
  }

  private showLogoutModal(): void {
    if (this.logoutModal) {
      this.logoutModal.show();
    }
  }

  public hideLogoutModal(): void {
    if (this.logoutModal) {
      this.logoutModal.hide();
    }
  }

  public logout() {
    this.hideLogoutModal();
    this.loginService.loggout()
  }

  public cancel() {
    this.hideLogoutModal();
    this.logoutService.setInModal(false);
  }
}
