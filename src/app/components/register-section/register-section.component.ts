import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserData } from '../../models/users';
import { UsersListService } from 'src/app/services/users-list.service';
import { Title } from '@angular/platform-browser';
import { ladas } from 'src/app/libs/ladas';


@Component({
  selector: 'app-register-section',
  templateUrl: './register-section.component.html',
  styleUrls: ['./register-section.component.css']
})
export class RegisterSectionComponent implements OnInit {

  users: UserData[] = [];
  user: UserData = new UserData();
  form: FormGroup = new FormGroup({
    user: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15), Validators.pattern(/^[a-zA-Z0-9]+$/)]),
    email: new FormControl('', [Validators.email, Validators.required]),
    phone: new FormControl('', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/), Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[0-9])[^'",{}\[\]\s]*$/)])
  });

  public ladas = ladas.sort((a, b) => {
    let ladaA = a.lada.replace('+', '');
    let ladaB = b.lada.replace('+', '');

    return parseInt(ladaA) - parseInt(ladaB)
  });
  appIcon: string = '';

  constructor(private userList: UsersListService, private toastr: ToastrService, private titleService: Title) {
    this.appIcon = document.body.getAttribute('data-bs-theme') == 'dark' ? 'assets/img/mpm-logo-dark.png' : 'assets/img/mpm-logo-light.png';
    this.titleService.setTitle(`MPM - Register`)
    this.form = new FormGroup({
      user: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15), Validators.pattern(/^[a-zA-Z0-9]+$/)]),
      email: new FormControl('', [Validators.email, Validators.required]),
      phone: new FormControl('', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/), Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[0-9])[^'",{}\[\]\s]*$/)])
    });
  }

  ngOnInit(): void {
  }

  isRegisterDataTrue(): void {
    this.user = {
      userId: '',
      userName: this.form.get('user')?.value,
      userMail: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
      phoneNumber: this.form.get('phone')?.value
    }

    // if(!(/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(this.form.get('user')?.value))) {
    //   if(/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(this.form.get('email')?.value)) {
    //     this.users = this.userList.usersList.filter((obj) => {
    //       return obj.userMail == this.form.get('email')?.value
    //     })
    //     if (this.users[0] == undefined) {
    //       this.users = this.userList.usersList.filter((obj) => {
    //         return obj.userName == this.form.get('user')?.value
    //       })
    //       if (this.users[0] == undefined) {
    //         //this.userList.usersList.push(this.user);

    //       } else {
    //         this.toastr.error('The user is already registered.', 'Operation Canceled');
    //       }
    //     } else {
    //       this.toastr.error('The mail has already been registered.', 'Operation Canceled');
    //     }
    //   } else {
    //     this.toastr.error('This is not a valid email address..', 'Operation Canceled');
    //   } 
    // } else {
    //   this.toastr.error('You cannot use an email address as a user.', 'Operation Canceled');
    // }

    this.userList.addUser(this.user).subscribe(data => {
      this.toastr.success('Successfully registered.', 'Operation Completed');
      this.form.reset();
    }, (error) => {
      console.log(error)
    })

    this.form = new FormGroup({
      user: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15), Validators.pattern(/^[a-zA-Z0-9]+$/)]),
      email: new FormControl('', [Validators.email, Validators.required]),
      phone: new FormControl('', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/), Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[0-9])[^'",{}\[\]\s]*$/)])
    });
  }
}