import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { icon, theme } from '../models/profile';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  //private myAppUrl = 'http://192.168.1.66:3000/'//JavaScript Servidor
  private myAppUrl = environment.apiKey//JavaScript
  //private myAppUrl = 'http://localhost:8080/'//Java
  //private myAppUrl = 'https://localhost:7172/'//C#
  private myApiUrlT = 'api/themes/'
  private myApiUrlI = 'api/icons/'

  constructor(private http: HttpClient) { }


  public getThemes(): Observable<Array<theme>> {
    return this.http.get<Array<theme>>(this.myAppUrl + this.myApiUrlT)
  }

  public getIcons(): Observable<Array<icon>> {
    return this.http.get<Array<icon>>(this.myAppUrl + this.myApiUrlI)
  }
}
