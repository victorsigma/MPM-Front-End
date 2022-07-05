import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginDataService {

  isLogin: boolean = false;
  constructor() {
  }
}
