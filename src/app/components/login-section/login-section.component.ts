import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginDataService } from '../../services/login-data.service';
import { Login, UserData } from '../../models/users';
import { ProjectListService } from '../../services/project-list.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login-section',
  templateUrl: './login-section.component.html',
  styleUrls: ['./login-section.component.css']
})
export class LoginSectionComponent implements OnInit {

  isLogin: boolean = false;
  users: UserData[] = [];
  form: FormGroup = new FormGroup({
    userNameOrEmail: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[0-9]).{6,}$/)]),
    remember: new FormControl()
  });
  appIcon: string = '';

  @Output() loginDate: EventEmitter<null> = new EventEmitter();
  constructor(private loginService: LoginDataService, private toastr: ToastrService, private titleService: Title) {
    this.appIcon = document.body.getAttribute('data-bs-theme') == 'dark' ? 'assets/img/mpm-logo-dark.png' : 'assets/img/mpm-logo-light.png';
    this.titleService.setTitle(`MPM - Login`)
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
}