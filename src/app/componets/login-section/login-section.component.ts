import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginDataService } from '../../services/login-data.service';
import { Login, UserData } from '../../models/users';
import { ProjectListService } from '../../services/project-list.service';

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
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[0-9]).{6,}$/)])
  });

  @Output() loginDate: EventEmitter<null> = new EventEmitter();
  constructor(private loginService: LoginDataService, private toastr: ToastrService, private projectList: ProjectListService) {
  }

  ngOnInit(): void {
  }

  loginSend(): void {
    /*if (/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(this.form.get('user')?.value)){
      this.users = this.userList.usersList.filter((obj) => {
        return obj.userMail == this.form.get('user')?.value
      })
      if (this.users[0] != undefined) {
        if (AES.decrypt(this.users[0].password,this.userList.encryptionKey).toString(enc.Utf8) == this.form.get('password')?.value) {
          this.loggingUser();
        } else {
          //this.toastr.error('Incorrect data connection error.', 'Operation Canceled');
        }
      } else {
        //this.toastr.error('Incorrect data connection error.', 'Operation Canceled');
      }
    } else {
      this.users = this.userList.usersList.filter((obj) => {
        return obj.userName == this.form.get('user')?.value
      })
      if (this.users[0] != undefined) {
        if (AES.decrypt(this.users[0].password,this.userList.encryptionKey).toString(enc.Utf8) == this.form.get('password')?.value) {
          this.loggingUser();
        } else {
          //this.toastr.error('Incorrect data connection error.', 'Operation Canceled');
        }
      } else {
        //this.toastr.error('Incorrect data connection error.', 'Operation Canceled');
      }
    }*/
    const user: Login = this.form?.value

    console.log(this.form.get('password')?.valid)

    this.loginService.login(user).subscribe((data)=> {
      this.loginService.setToken(data);
    }, (error) => {
      console.log(error)
    })

    this.reloadForm();
  }

  ngOnDestroy(): void {

  }


  reloadForm() {
    this.form = new FormGroup({
      userNameOrEmail: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[0-9]).{6,}$/)])
    });
  }
}