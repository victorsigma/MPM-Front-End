import { Injectable } from '@angular/core';
import { Jwt, Login, User } from '../models/users';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginDataService {


  private myAppUrl = environment.apiKey;
  private myApiUrl = 'api/Login';
  private myApiUrlV = 'api/verifyLogin'; 

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

  public login(user: Login, isRemember: boolean): Observable<Jwt> {
    return this.http.post<Jwt>(`${this.myAppUrl}${this.myApiUrl}?remember=${isRemember}`, user)
  }

  public verifyLogin(): Observable<{value: boolean}> {
    return this.http.post<{value: boolean}>(`${this.myAppUrl}${this.myApiUrlV}`, this.getToken())
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
