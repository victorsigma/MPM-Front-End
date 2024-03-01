import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginDataService } from '../../services/login-data.service';
import { Login, UserData } from '../../models/users';
import { ProjectListService } from '../../services/project-list.service';
import { Title } from '@angular/platform-browser';
import { LangService } from 'src/app/services/lang.service';
import { Lang } from 'src/app/models/lang';

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
  appIcon: string = '';

  public lang: Lang = new Lang();
  @Output() loginDate: EventEmitter<null> = new EventEmitter();
  constructor(private loginService: LoginDataService, private toastr: ToastrService, private titleService: Title, private langService: LangService) {
    this.appIcon = document.body.getAttribute('data-bs-theme') == 'dark' ? 'assets/img/mpm-logo-dark.png' : 'assets/img/mpm-logo-light.png';
    this.titleService.setTitle(`MPM - Login`)
    this.lang = this.langService.getLang();
  }

  ngOnInit(): void {
  }

  loginSend(): void {
    const user: Login = {
      userNameOrEmail: this.form.get('userNameOrEmail')?.value,
      password: this.form.get('password')?.value
    }

    const isRemember: boolean = this.form.get('remember')?.value;

    this.loginService.login(user, isRemember).subscribe((data)=> {
      this.loginService.setToken(data);
    }, (error) => {
      this.toastr.error('Incorrect data connection error.', 'Operation Canceled');
    })

    this.reloadForm();
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

  resolved(captchaResponse: any) {
    console.log(captchaResponse)
    this.loginService.verifyCapcha({secret: '6Lfwv4YpAAAAAM7h7Z7uzVgP5wsAYzUn_r1yRP8l', response: captchaResponse}).subscribe((data) => {
      this.captchaResponse = data.success;
      console.log(data);
    })
  }
}