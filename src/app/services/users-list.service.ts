import { Injectable } from '@angular/core';
import { UserData } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersListService {


  usersList: UserData[] = [
    {
      'userId': 1,
      'userMail': 'victorossielgaray@gmail.com',
      'userName': 'victorsigma',
      'password': 'pato123',
      'phoneNumber': ''
    }
  ]
  constructor() { }
}
