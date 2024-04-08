import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { verify } from 'crypto';

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
    private myApiUrlA = 'api/verifyA2F/'
    private myApiUrlE = 'api/enableA2F/'
    private myApiUrlD = 'api/disableA2F/'

  constructor(private http: HttpClient) { }

  public verifyAccount(): Observable<{emailAlreadyVerified: boolean}> {
    return this.http.get<{emailAlreadyVerified: boolean}>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  public verifyA2F(): Observable<{authTwoVerified: boolean}> {
    return this.http.get<{authTwoVerified: boolean}>(`${this.myAppUrl}${this.myApiUrlA}`)
  }

  public verifyAccountRequest(): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrlR}`)
  }

  public enableA2F(): Observable<{authTwoVerified: boolean}> {
    return this.http.put<{authTwoVerified: boolean}>(`${this.myAppUrl}${this.myApiUrlE}`, null)
  }


  public disableA2F(): Observable<{message: string}> {
    return this.http.put<{message: string}>(`${this.myAppUrl}${this.myApiUrlD}`, null)
  }



  public verifyAccountValidation(token: string): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrlV}${token}`)
  }
}
