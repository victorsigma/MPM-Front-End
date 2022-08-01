import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AES } from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
import { UserData } from '../../models/users';
import {v4 as uuidv4} from 'uuid';
import { UsersListService } from 'src/app/services/users-list.service';


@Component({
  selector: 'app-register-section',
  templateUrl: './register-section.component.html',
  styleUrls: ['./register-section.component.css']
})
export class RegisterSectionComponent implements OnInit {

  users: UserData[] = [];
  user: UserData = new UserData();
  form: FormGroup = new FormGroup({
    user: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    password: new FormControl()
  });
  constructor(private userList: UsersListService, private toastr: ToastrService) { 
    this.form = new FormGroup({
      user: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  isRegisterDataTrue(): void {
    this.user = {
      userId: uuidv4(),
      userName: this.form.get('user')?.value,
      userMail:  this.form.get('email')?.value,
      password: AES.encrypt(this.form.get('password')?.value,this.userList.encryptionKey).toString(),
      phoneNumber: this.form.get('phone')?.value
    }

    if(!(/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(this.form.get('user')?.value))) {
      if(/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(this.form.get('email')?.value)) {
        this.users = this.userList.usersList.filter((obj) => {
          return obj.userMail == this.form.get('email')?.value
        })
        if (this.users[0] == undefined) {
          this.users = this.userList.usersList.filter((obj) => {
            return obj.userName == this.form.get('user')?.value
          })
          if (this.users[0] == undefined) {
            //this.userList.usersList.push(this.user);
            this.userList.addUser(this.user).subscribe(data => {
              this.toastr.success('Successfully registered.', 'Operation Completed');
              this.userList.getList();
              this.form.reset();
            })
          } else {
            this.toastr.error('The user is already registered.', 'Operation Canceled');
          }
        } else {
          this.toastr.error('The mail has already been registered.', 'Operation Canceled');
        }
      } else {
        this.toastr.error('This is not a valid email address..', 'Operation Canceled');
      } 
    } else {
      this.toastr.error('You cannot use an email address as a user.', 'Operation Canceled');
    }

    this.form = new FormGroup({
      user: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      password: new FormControl()
    });
  }
}