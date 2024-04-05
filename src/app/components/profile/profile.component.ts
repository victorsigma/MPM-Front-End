import { Component } from '@angular/core';
import { Modal } from 'bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Lang } from 'src/app/models/lang';
import { icon, theme } from 'src/app/models/profile';
import { LangService } from 'src/app/services/lang.service';
import { LoginDataService } from 'src/app/services/login-data.service';
import { ProfileService } from 'src/app/services/profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  public iconPathFull: string = `${environment.apiKey}api/user-icon/full/`
  public userIcon: string = '';
  public userName: string = '';
  public showIcons: boolean = false;
  public icons: Array<icon> = []
  public themes: Array<theme> = []
  public themePath = `${environment.apiKey}api/themes/`
  private newTheme: theme = new theme();
  private newIcon: icon = new icon();

  public lang: Lang = new Lang()
  constructor(public loginService: LoginDataService, private themeService: ProfileService, private langService: LangService, private toastr: ToastrService) {
    this.lang = this.langService.getLang();
    this.themeService.getThemes().subscribe((data) => {
      this.themes = data;
    })
    this.themeService.getIcons().subscribe((data) => {
      this.icons = data;
    })
  }

  ngOnInit(): void {
    this.userIcon = `${this.loginService.getUserInfo().userIcon}.jpg`;
    this.userName = this.loginService.getUserInfo().userName;
  }

  testTheme(theme: theme): void {
    if (document.body.getAttribute('data-bs-theme') != theme.themeType) {
      document.body.setAttribute('data-bs-theme', theme.themeType)
      this.newTheme = theme;

      const changeTheme = new Modal(document.getElementById('changeTheme') as Element);
      changeTheme.show()
    }
  }

  changeIcon(icon: icon): void {
    this.newIcon = icon;

    const changeIcon = new Modal(document.getElementById('changeIcon') as Element);
    changeIcon.show()
  }


  confirmTheme() {
    this.loginService.changeTheme(this.newTheme).subscribe({
      next: (data) => {
        this.toastr.success(this.lang.toast.update_ok, this.lang.toast.status_complited)
        this.loginService.setToken(data);
      },
      error: () => {
        this.toastr.error(this.lang.toast.update_error, this.lang.toast.status_cancel)
      }
    })
  }

  cancelTheme() {
    this.newTheme = new theme();
    document.body.setAttribute('data-bs-theme', this.loginService.getUserInfo().selectedTheme)
  }

  confirmIcon() {
    this.loginService.changeIcon(this.newIcon).subscribe({
      next: (data) => {
        this.toastr.success(this.lang.toast.update_ok, this.lang.toast.status_complited)
        this.loginService.setToken(data);
      },
      error: () => {
        this.toastr.error(this.lang.toast.update_error, this.lang.toast.status_cancel)
      }
    })
  }
}
