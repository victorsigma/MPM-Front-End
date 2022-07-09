import { Injectable } from '@angular/core';
import { projectsHasUser } from '../models/projectsHasUser';

@Injectable({
  providedIn: 'root'
})
export class UsersProjectsService {

  activities: projectsHasUser[] = [
    {
      'proyects_id_p': 1,
      'user_id_user': 'a826a50d-e189-47c8-a0e9-929607f78cfc',
      'roles_id_rol': 1
    }
  ]
  constructor() { }
}
