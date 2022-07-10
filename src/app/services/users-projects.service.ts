import { Injectable } from '@angular/core';
import { projectsHasUser } from '../models/projectsHasUser';

@Injectable({
  providedIn: 'root'
})
export class UsersProjectsService {

  activities: projectsHasUser[] = [
    {
      'proyects_id_p': '490602c6-a115-44ec-9bfb-d1d9b9f476d9',
      'user_id_user': 'a826a50d-e189-47c8-a0e9-929607f78cfc',
      'roles_id_rol': 1
    }
  ]
  constructor() { }
}