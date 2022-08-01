import { Injectable } from '@angular/core';
import { UserData } from '../models/users';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersListService {

  //private myAppUrl = 'http://192.168.1.66:3000/'//JavaScript Servidor
  //private myAppUrl = 'http://localhost:3000/'//JavaScript
  private myAppUrl = 'http://localhost:8080/'//Java
  //private myAppUrl = 'https://localhost:7172/'//C#
  private myApiUrl = 'api/Users/'

  encryptionKey: string = '77767b40-fedc-11ec-b939-0242ac120002';
  usersList: UserData[] = [];
  constructor(private http:HttpClient) { }

  getListUsers(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl)
  }

  getList() {
    this.getListUsers().subscribe(data=> {
      this.usersList = data;
    })
  }

  addUser(user: UserData) {
    return this.http.post(this.myAppUrl + this.myApiUrl, user)
  }

  updateUser(id: string, user: UserData): Observable<any> {
    return this.http.put(this.myAppUrl + this.myApiUrl+id, user)
  }
}
