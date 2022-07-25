import { Injectable } from '@angular/core';
import { ProjectsHasUser } from '../models/projectsHasUser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersProjectsService {

  //private myAppUrl = 'http://localhost:3000/'
  private myAppUrl = 'http://localhost:8080/'
  //private myAppUrl = 'https://localhost:7172/'
  private myApiUrl = 'api/ProjectsHasUser/'

  projectMembers: ProjectsHasUser[] = []
  constructor(private http:HttpClient) { }

  getListProjectUser(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl)
  }

  getList() {
    this.getListProjectUser().subscribe(data=> {
      this.projectMembers = data;
    })
  }

  addProjectUser(projectUser: ProjectsHasUser) {
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