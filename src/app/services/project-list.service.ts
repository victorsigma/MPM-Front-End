import { Injectable } from '@angular/core';
import { ProjectData } from '../models/projects';
import { LoginDataService } from './login-data.service';
import { UsersProjectsService } from './users-projects.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectListService {

  //private myAppUrl = 'http://localhost:3000/'
  private myAppUrl = 'https://localhost:7172/'
  private myApiUrl = 'api/Projects/'

  projectsMaster: ProjectData[] = []

  projects: ProjectData[] = [];
  getProject: ProjectData[] = [];
  constructor(private loginData: LoginDataService, private memberList: UsersProjectsService, private http: HttpClient) { }

  loadProjects() {
    this.memberList.getList();
    this.getList();
    
    if(this.projects.length != 0) {
      this.reseatProjects();
    }
    this.memberList.projectMembers.filter(data => { return data.userIdUser == this.loginData.usersList[0].userId }).forEach(elemet => {
      this.getProject = this.projectsMaster.filter(data => {
        return data.id == elemet.proyectsIdProject
      })
      this.projects.push(this.getProject[0])
    });
  }

  reseatProjects() {
    this.projects = [];
  }

  getListProjects(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl)
  }

  getList() {
    this.getListProjects().subscribe(data => {
      this.projectsMaster = data;
    })
  }

  addProjects(project: ProjectData) {
    return this.http.post(this.myAppUrl + this.myApiUrl, project)
  }

  updateProjects(id: string, project: ProjectData) {
    return this.http.put(this.myAppUrl + this.myApiUrl+id, project)
  }
}


/*{
      'id': '490602c6-a115-44ec-9bfb-d1d9b9f476d9',
      'title': 'Project MPM',
      'subtitle': 'Proyecto de Intregradora I',
      'src': 'img_6',
      'dateStart': new Date("06/26/2022"),
      'dateEnd':new Date("07/20/2022")
    },
    {
      'id': 'd648cf18-5145-48e8-bec9-891f346136cc',
      'title': 'Project 2',
      'subtitle': 'Proyecto de Prueba',
      'src': 'img_3',
      'dateStart': new Date("06/10/2022"),
      'dateEnd':new Date("07/30/2022")
    }
*/