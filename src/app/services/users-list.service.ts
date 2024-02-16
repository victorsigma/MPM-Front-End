import { Injectable } from '@angular/core';
import { UserData } from '../models/users';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsersListService {

  //private myAppUrl = 'http://192.168.1.66:3000/'//JavaScript Servidor
  private myAppUrl = environment.apiKey//JavaScript
  //private myAppUrl = 'http://localhost:8080/'//Java
  //private myAppUrl = 'https://localhost:7172/'//C#
  private myApiUrl = 'api/users/'

  encryptionKey: string = '77767b40-fedc-11ec-b939-0242ac120002';
  usersList: UserData[] = [];
  constructor(private http:HttpClient) { }

  addUser(user: UserData) {
    return this.http.post(this.myAppUrl + this.myApiUrl, user)
  }

  updateUser(id: string, user: UserData): Observable<any> {
    return this.http.put(this.myAppUrl + this.myApiUrl+id, user)
  }
}
