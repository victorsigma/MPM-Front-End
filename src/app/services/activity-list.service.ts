import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ActivityData } from '../models/ativities';
import { ProjectsHasUser } from '../models/projectsHasUser';
import { UsersProjectsService } from './users-projects.service';
import { LoginDataService } from './login-data.service';
import { ProjectDataService } from './project-data.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityListService {

  //private myAppUrl = 'http://192.168.1.66:3000/'//JavaScript Servidor
  private myAppUrl = 'http://localhost:3000/'//JavaScript
  //private myAppUrl = 'http://localhost:8080/'//Java
  //private myAppUrl = 'https://localhost:7172/'//C#
  private myApiUrl = 'api/Activities/'

  activitiesMaster: ActivityData[] = []

  activities: ActivityData[] = [];
  activitiesUn: ActivityData[] = [];
  activitiesIn: ActivityData[] = [];
  activitiesCm: ActivityData[] = [];

  loginRol: ProjectsHasUser[] = [];
  constructor(private userMember: UsersProjectsService, private loginData: LoginDataService, public projectData: ProjectDataService, private http: HttpClient) {
    //this.getList();
    this.filterRol();
  }


  getListActivities(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl)
  }

  getList() {
    this.getListActivities().subscribe(data => {
      this.activitiesMaster = data;
    })
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

  filterRol() {
    //this.getList();
    this.loginRol = this.userMember.projectMembers.filter(data => {
      return data.proyectsIdProject == this.projectData.project.id && data.userIdUser == this.loginData.usersList[0].userId
    })

    if (this.loginRol[0].rolesIdRol == 0) {
      this.leaderActivitis();
    }
    if (this.loginRol[0].rolesIdRol == 1) {
      this.analystActivitis();
    }
    if (this.loginRol[0].rolesIdRol == 2) {
      this.designerActivitis();
    }
    if (this.loginRol[0].rolesIdRol == 3) {
      this.programmerActivitis();
    }
  }

  leaderActivitis() {
    this.activities = this.activitiesMaster.filter(data => {
      return data.leader == true;
    })

    this.activitiesCm = this.activities.filter(data => {
      return data.status == 3;
    })

    this.activitiesIn = this.activities.filter(data => {
      return data.status == 2;
    })

    this.activitiesUn = this.activities.filter(data => {
      return data.status == 1;
    })
  }

  analystActivitis() {
    this.activities = this.activitiesMaster.filter(data => {
      return data.analyst == true;
    })

    this.activitiesCm = this.activities.filter(data => {
      return data.status == 3;
    })

    this.activitiesIn = this.activities.filter(data => {
      return data.status == 2;
    })

    this.activitiesUn = this.activities.filter(data => {
      return data.status == 1;
    })
  }

  designerActivitis() {
    this.activities = this.activitiesMaster.filter(data => {
      return data.designer == true;
    })

    this.activitiesCm = this.activitiesMaster.filter(data => {
      return data.designer == true && data.status == 3;
    })

    this.activitiesIn = this.activitiesMaster.filter(data => {
      return data.designer == true && data.status == 2;
    })

    this.activitiesUn = this.activitiesMaster.filter(data => {
      return data.designer == true && data.status == 1;
    })
  }

  programmerActivitis() {
    this.activities = this.activitiesMaster.filter(data => {
      return data.programmer == true;
    })

    this.activitiesCm = this.activitiesMaster.filter(data => {
      return data.programmer == true && data.status == 3;
    })

    this.activitiesIn = this.activitiesMaster.filter(data => {
      return data.programmer == true && data.status == 2;
    })

    this.activitiesUn = this.activitiesMaster.filter(data => {
      return data.programmer == true && data.status == 1;
    })
  }
}
