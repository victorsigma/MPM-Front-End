import { Injectable } from '@angular/core';
import { ProjectData } from '../models/projects';
import { LoginDataService } from './login-data.service';
import { UsersProjectsService } from './users-projects.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectListService {

  //private myAppUrl = 'http://192.168.1.66:3000/'//JavaScript Servidor
  private myAppUrl = environment.apiKey//JavaScript
  //private myAppUrl = 'http://localhost:8080/'//Java
  //private myAppUrl = 'https://localhost:7172/'//C#
  private myApiUrl = 'api/projects/'

  projectsMaster: ProjectData[] = []

  projects: ProjectData[] = [];
  getProject: ProjectData[] = [];
  constructor(private loginData: LoginDataService, private memberList: UsersProjectsService, private http: HttpClient) { }

  reseatProjects() {
    this.projects = [];
  }

  getListProjects(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl)
  }

  getList() {
    this.getListProjects().subscribe(async data => {
      this.projectsMaster = await data;
    })
  }

  addProjects(project: ProjectData) {
    return this.http.post(this.myAppUrl + this.myApiUrl, project)
  }

  updateProjects(id: string, project: ProjectData) {
    return this.http.put(this.myAppUrl + this.myApiUrl+id, project)
  }

  removeProjects(id: string) {
    return this.http.delete(this.myAppUrl + this.myApiUrl + id)
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