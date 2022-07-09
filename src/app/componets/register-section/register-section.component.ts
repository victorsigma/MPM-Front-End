import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AES,enc } from 'crypto-js';
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

    this.users = this.userList.usersList.filter((obj) => {
      return obj.userMail == this.form.get('email')?.value
    })
    if (this.users[0] == undefined) {
      this.users = this.userList.usersList.filter((obj) => {
        return obj.userName == this.form.get('user')?.value
      })
      if (this.users[0] == undefined) {
        this.userList.usersList.push(this.user);
        this.toastr.success('Successfully registered.', 'Operation Completed');
      } else {
        this.toastr.error('The user is already registered.', 'Operation Canceled');
      }
    } else {
      this.toastr.error('The mail has already been registered.', 'Operation Canceled');
    }

    this.form = new FormGroup({
      user: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      password: new FormControl()
    });
  }
}