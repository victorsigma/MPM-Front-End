import { Injectable } from '@angular/core';
import { Jwt, Login, User, UserUpdate } from '../models/users';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { icon, theme } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class LoginDataService {


  private myAppUrl = environment.apiKey;
  private myApiUrl = 'api/Login';
  private myApiUrlV = 'api/verifyLogin'; 
  private myApiUrlC = 'api/changeTheme'; 
  private myApiUrlI = 'api/changeIcon'; 
  private myApiUrlU = 'api/users'; 

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

  public changeTheme(theme: theme): Observable<Jwt> {
    const newTheme = {
      theme: theme,
      token: this.getToken().token
    }
    return this.http.put<Jwt>(`${this.myAppUrl}${this.myApiUrlC}`, newTheme)
  }

  public changeIcon(icon: icon): Observable<Jwt> {
    const newIcon = {
      icon: icon,
      token: this.getToken().token
    }
    return this.http.put<Jwt>(`${this.myAppUrl}${this.myApiUrlI}`, newIcon)
  }

  public updateUser(update: UserUpdate): Observable<Jwt> {
    const updateUser = {
      update: update,
      token: this.getToken().token
    }
    return this.http.put<Jwt>(`${this.myAppUrl}${this.myApiUrlU}`, updateUser)
  }

  public verifyLogin(): Observable<{value: boolean}> {
    return this.http.post<{value: boolean}>(`${this.myAppUrl}${this.myApiUrlV}`, this.getToken())
  }

  public verifyCapcha(verifyToken: any): Observable<{success: boolean}> {
    return this.http.post<{success: boolean}>('https://www.google.com/recaptcha/api/siteverify', verifyToken)
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
    return this.token.token ? jwtDecode<User>(this.token.token) : new User();

  }

  public loggout() {
    if(localStorage.getItem('token')) {
      localStorage.removeItem('token');
      location.reload()
    }
  }

  public isLogin(): boolean {
    return this.status;
  }
}
