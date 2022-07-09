import { Injectable } from '@angular/core';
import { UserData } from '../models/users';
import { AES } from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class UsersListService {


  encryptionKey: string = '77767b40-fedc-11ec-b939-0242ac120002';
  usersList: UserData[] = [
    {
      'userId': 'a826a50d-e189-47c8-a0e9-929607f78cfc',
      'userMail': 'victorossielgaray1@gmail.com',
      'userName': 'victorsigma',
      'password': AES.encrypt('pato123',this.encryptionKey).toString(),
      'phoneNumber': ''
    }
  ]
  constructor() { }
}
