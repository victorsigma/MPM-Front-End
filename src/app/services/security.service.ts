import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

    //private myAppUrl = 'http://192.168.1.66:3000/'//JavaScript Servidor
    private myAppUrl = environment.apiKey//JavaScript
    //private myAppUrl = 'http://localhost:8080/'//Java
    //private myAppUrl = 'https://localhost:7172/'//C#
    private myApiUrl = 'api/verifyAccount/'
    private myApiUrlR = 'api/verifyAccountRequest/'
    private myApiUrlV = 'api/verifyAccountValidation/'

  constructor(private http: HttpClient) { }

  public verifyAccount(): Observable<{emailAlreadyVerified: boolean}> {
    return this.http.get<{emailAlreadyVerified: boolean}>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  public verifyAccountRequest(): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrlR}`)
  }


  public verifyAccountValidation(token: string): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrlV}${token}`)
  }
}
