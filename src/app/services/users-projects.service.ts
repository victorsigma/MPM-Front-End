import { Injectable } from '@angular/core';
import { PostProjectsHasUser, ProjectsHasUser } from '../models/projectsHasUser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersProjectsService {

  //private myAppUrl = 'http://192.168.1.66:3000/'//JavaScript Servidor
  private myAppUrl = environment.apiKey//JavaScript
  //private myAppUrl = 'http://localhost:8080/'//Java
  //private myAppUrl = 'https://localhost:7172/'//C#
  private myApiUrl = 'api/projectsHasUser/'

  projectMembers: ProjectsHasUser[] = []
  constructor(private http:HttpClient) { }

  getListProjectUser(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl)
  }

  getList() {
    this.getListProjectUser().subscribe(async data=> {
      this.projectMembers = await data;
    })
  }

  addProjectUser(projectUser: PostProjectsHasUser) {
    return this.http.post(this.myAppUrl + this.myApiUrl, projectUser)
  }

  removeProjectUser(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApiUrl + id)
  }
}

/*
{
      'Id': 1,
      'proyectsIdProject': '490602c6-a115-44ec-9bfb-d1d9b9f476d9',
      'userIdUser': '659922da-62ef-4ee1-a1e6-b5d672588df8',
      'rolesIdRol': 0
    },
    {
      'Id': 2,
      'proyectsIdProject': '490602c6-a115-44ec-9bfb-d1d9b9f476d9',
      'userIdUser': 'e9b8e535-203b-4539-a4f3-34c3b70e92ce',
      'rolesIdRol': 1
    },
    {
      'Id': 3,
      'proyectsIdProject': 'd648cf18-5145-48e8-bec9-891f346136cc',
      'userIdUser': 'e9b8e535-203b-4539-a4f3-34c3b70e92ce',
      'rolesIdRol': 0
    }
*/