import { Injectable } from '@angular/core';
import { projectsHasUser } from '../models/projectsHasUser';

@Injectable({
  providedIn: 'root'
})
export class UsersProjectsService {

  activities: projectsHasUser[] = [
    {
      'proyects_id_p': 1,
      'user_id_user': 1,
      'roles_id_rol': 1
    }
  ]
  constructor() { }
}
