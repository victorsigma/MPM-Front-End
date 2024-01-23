import { Injectable } from '@angular/core';
import { ActivityData } from '../models/ativities';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActivityDataService {

  //private myAppUrl = 'http://192.168.1.66:3000/'//JavaScript Servidor
  private myAppUrl = 'http://localhost:3000/'//JavaScript
  //private myAppUrl = 'http://localhost:8080/'//Java
  //private myAppUrl = 'https://localhost:7172/'//C#
  private myApiUrl = 'api/activities/'

  constructor(private http: HttpClient) { }

  getListActivities(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl)
  }

  addActivity(activity: ActivityData) {
    return this.http.post(this.myAppUrl + this.myApiUrl, activity)
  }

  removeActivity(id: string) {
    return this.http.delete(this.myAppUrl + this.myApiUrl + id)
  }

  updateActivity(id: string, activity: ActivityData) {
    return this.http.put(this.myAppUrl + this.myApiUrl+id, activity)
  }

}
