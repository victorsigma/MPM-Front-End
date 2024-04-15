import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import { Lang } from 'src/app/models/lang';
import { LangService } from 'src/app/services/lang.service';
import { LoginDataService } from 'src/app/services/login-data.service';
import { LogoutService } from 'src/app/services/logout.service';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.css']
})
export class LogoutModalComponent {

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
