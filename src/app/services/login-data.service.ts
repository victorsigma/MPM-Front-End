import { Injectable } from '@angular/core';
import { Jwt, Login, User } from '../models/users';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginDataService {


  private myAppUrl = 'http://localhost:3000/'
  private myApiUrl = 'api/Login'

  public status: boolean = false;
  public rol: number = 6;
  private token: Jwt = new Jwt();
  
  constructor(private http: HttpClient) {
    if(this.getUser().token != '') {
      this.token = this.getUser()
      this.status = true;
    } else {
      this.status = false;
      this.token = new Jwt()
    }
  }

  public login(user: Login): Observable<Jwt> {
    return this.http.post<Jwt>(this.myAppUrl + this.myApiUrl, user)
  }

  public setToken(user: Jwt): void {
    this.status = true;
    this.token = user;

    localStorage.setItem('token', user.token);
    location.reload()
  }

  public getToken(): Jwt {
    return this.token;
  }

  private getUser(): Jwt {
    const user: Jwt = { 'token': localStorage.getItem('token') || '' }
    return user;
  }

  public getUserInfo(): User {
    return jwtDecode<User>(this.token.token)
  }

  public loggout() {
    localStorage.removeItem('token');
    location.reload()
  }

  public isLogin(): boolean {
    return this.status;
  }
}
