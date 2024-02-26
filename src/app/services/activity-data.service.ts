import { Injectable } from '@angular/core';
import { ActivityData, ActivityDataPost } from '../models/ativities';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginDataService } from './login-data.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityDataService {

  //private myAppUrl = 'http://192.168.1.66:3000/'//JavaScript Servidor
  private myAppUrl = environment.apiKey//JavaScript
  //private myAppUrl = 'http://localhost:8080/'//Java
  //private myAppUrl = 'https://localhost:7172/'//C#
  private myApiUrl = 'api/activities'

  private modalActivity = new ActivityData();

  constructor(private http: HttpClient) { }

  getListActivities(idProject: string, status?: string): Observable<Array<ActivityData>> {
    return this.http.get<Array<ActivityData>>(this.myAppUrl + this.myApiUrl + `?project=${idProject}&status=${status}`)
  }

  getActivityStatusType(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + `-status`)
  }

  addActivity(activity: ActivityDataPost) {
    return this.http.post(this.myAppUrl + this.myApiUrl, activity)
  }

  removeActivity(id: string) {
    return this.http.delete(this.myAppUrl + this.myApiUrl + id)
  }

  updateActivity(id: string, activity: ActivityData) {
    return this.http.put(this.myAppUrl + this.myApiUrl+id, activity)
  }

  getProjectRol(id: string) {
    return this.http.get(this.myAppUrl + 'api/UserRol/' + id)
  }

  setModalActivity(activity: ActivityData) {
    this.modalActivity = activity;
  }

  getModalActivity() {
    return this.modalActivity;
  }
}
