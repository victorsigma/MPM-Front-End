import { Injectable } from '@angular/core';
import { ProjectsHasUser } from '../models/projectsHasUser';

@Injectable({
  providedIn: 'root'
})
export class UsersProjectsService {

  projectMembers: ProjectsHasUser[] = [
    {
      'proyects_id_p': '490602c6-a115-44ec-9bfb-d1d9b9f476d9',
      'user_id_user': 'a826a50d-e189-47c8-a0e9-929607f78cfc',
      'roles_id_rol': 0
    },
    {
      'proyects_id_p': '490602c6-a115-44ec-9bfb-d1d9b9f476d9',
      'user_id_user': 'e9b8e535-203b-4539-a4f3-34c3b70e92ce',
      'roles_id_rol': 1
    },
    {
      'proyects_id_p': 'd648cf18-5145-48e8-bec9-891f346136cc',
      'user_id_user': 'e9b8e535-203b-4539-a4f3-34c3b70e92ce',
      'roles_id_rol': 0
    }
  ]
  constructor() { }
}