import { Injectable } from '@angular/core';
import { ProjectData } from '../models/projects';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PostProjectsHasUser } from '../models/projectsHasUser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {

  //private myAppUrl = 'http://192.168.1.66:3000/'//JavaScript Servidor
  private myAppUrl = environment.apiKey//JavaScript
  //private myAppUrl = 'http://localhost:8080/'//Java
  //private myAppUrl = 'https://localhost:7172/'//C#
  private myApiUrl = 'api/projects/'
  private myApiUrlHas = 'api/projectsHasUser'

  project:ProjectData = new ProjectData();
  constructor(private http: HttpClient) { }


  getListProjects(): Observable<any> {
    return this.http.get<Array<ProjectData>>(this.myAppUrl + this.myApiUrl)
  }

  getProjectById(id: string): Observable<any> {
    return this.http.get<any>(this.myAppUrl + this.myApiUrl + id)
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

  addProjectUser(projectUser: PostProjectsHasUser) {
    return this.http.post(this.myAppUrl + this.myApiUrlHas, projectUser)
  }

  getListProjectUser(idProject: string): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrlHas + `?project=${idProject}`)
  }

  updateProjectUser(userName: string, idProject: string, idRol: any): Observable<any> {
    return this.http.put(`${this.myAppUrl}${this.myApiUrlHas}?project=${idProject}&user=${userName}`, {idRol: idRol});
  }

  removeProjectUser(userName: string, idProject: string): Observable<any> {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrlHas}?project=${idProject}&user=${userName}`)
  }
}