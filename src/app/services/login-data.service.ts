import { Injectable } from '@angular/core';
import { UserData } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class LoginDataService {

  isLogin: boolean = false;
  usersList: UserData[] = [];
  
  constructor() {
  }
}
