import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginDataService } from '../../services/login-data.service';
import { Login, UserData } from '../../models/users';
import { ProjectListService } from '../../services/project-list.service';
import { Title } from '@angular/platform-browser';
import { LangService } from 'src/app/services/lang.service';
import { Lang } from 'src/app/models/lang';
import { theme } from 'src/app/models/profile';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-section',
  templateUrl: './login-section.component.html',
  styleUrls: ['./login-section.component.css']
})
export class LoginSectionComponent implements OnInit {

  isLogin: boolean = false;
  users: UserData[] = [];
  captchaResponse: boolean = false;
  form: FormGroup = new FormGroup({
    userNameOrEmail: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[0-9]).{6,}$/)]),
    remember: new FormControl()
  });

  formAuthentication: FormGroup = new FormGroup({
    verificationCode: new FormControl('', [Validators.required])
  });

  appIcon: string = '';
  captchaKey: string = ''

  twoFactorAuthentication: boolean = false;

  private userTwoAuthentication = {
    userNameOrEmail: '',
    password: '',
    remember: false
  }

  public lang: Lang = new Lang();
  public theme: 'dark' | 'light' = 'dark';
  @Output() loginDate: EventEmitter<null> = new EventEmitter();
  constructor(private loginService: LoginDataService, private toastr: ToastrService, private titleService: Title, private langService: LangService) {
    this.appIcon = document.body.getAttribute('data-bs-theme') == 'default' ? 'assets/img/mpm-logo-dark.png' : 'assets/img/mpm-logo-light.png';
    this.titleService.setTitle(`MPM - Login`)
    this.lang = this.langService.getLang();
    this.captchaKey = environment.recaptcha;
  }

  ngOnInit(): void {
    this.theme = document.body.getAttribute('data-bs-theme') == 'default' ? 'dark' : 'light'
  }

  loginSend(): void {
    if(this.captchaResponse) {
      const user: Login = {
        userNameOrEmail: this.form.get('userNameOrEmail')?.value,
        password: this.form.get('password')?.value,
        verificationCode: null
      }
  
      const isRemember: boolean = this.form.get('remember')?.value;
  
      this.loginService.login(user, isRemember).subscribe({
        next: (data)=> {
          if(data.message != null) {
            if(data.message === 'Verification code sent') {
              this.userTwoAuthentication = {
                userNameOrEmail: this.form.get('userNameOrEmail')?.value,
                password: this.form.get('password')?.value,
                remember: this.form.get('remember')?.value
              }
              console.log(this.userTwoAuthentication)

              this.twoFactorAuthentication = true;
            }
          } else {
            this.loginService.setToken(data);
          }
        }, 
        error: (error) => {
          this.toastr.error(this.lang.toast.login_error, this.lang.toast.status_cancel);
        }
      })
    } else {
      this.toastr.error(this.lang.toast.capcha)
    }
  }

  loginAuth(): void {
    const user: Login = {
      userNameOrEmail: this.userTwoAuthentication.userNameOrEmail,
      password: this.userTwoAuthentication.password,
      verificationCode: this.formAuthentication.get('verificationCode')?.value
    }

    const isRemember: boolean = this.userTwoAuthentication.remember;

    this.loginService.loginAuth(user, isRemember).subscribe({
      next: (data)=> {
        this.loginService.setToken(data);
      }, 
      error: (error) => {
        this.toastr.error(this.lang.toast.login_error, this.lang.toast.status_cancel);
      }
    })
  }

  ngOnDestroy(): void {

  }


  reloadForm() {
    this.form = new FormGroup({
      userNameOrEmail: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[0-9]).{6,}$/)]),
      remember: new FormControl()
    });
  }

  resolved(captchaResponse: string | null) {
    this.captchaResponse = captchaResponse ? true : false;
  }
}