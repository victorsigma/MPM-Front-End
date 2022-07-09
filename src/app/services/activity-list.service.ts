import { Injectable } from '@angular/core';
import { RolesListActivity } from 'src/app/models/roles';
import { ActivityData } from '../models/ativities';

@Injectable({
  providedIn: 'root'
})
export class ActivityListService {

  activities: ActivityData[] = [
    {
      "id": '3cf75862-ca69-4436-807f-8e9262b7a888',
      "title": "Actividad 1",
      "subtitle": "Actividad de pruebas",
      "src": "img_1",
      "status": 3,
      "dateEnd": new Date("07/16/2022"),
      "rolesList": new RolesListActivity(true, true, true, false),
      "projectId": 'd648cf18-5145-48e8-bec9-891f346136cc'
      
    },
    {
      "id": '18b421e7-2366-496f-accb-2f4ea9a3ce6b',
      "title": "Actividad 2",
      "subtitle": "Segunda Actividad",
      "src": "img_2",
      "status": 1,
      "dateEnd": new Date("12/28/2022"),
      "rolesList": new RolesListActivity(true, true, true, true),
      "projectId": '490602c6-a115-44ec-9bfb-d1d9b9f476d9'
    },
    {
      "id": '4b45465a-aa8e-4e72-bc52-4835b4a1c3cd',
      "title": "Actividad 3",
      "subtitle": "Jaja soy la actividad 3",
      "src": "img_3",
      "status": 2,
      "dateEnd": new Date("09/24/2022"),
      "rolesList": new RolesListActivity(true, false, false, false),
      "projectId": '490602c6-a115-44ec-9bfb-d1d9b9f476d9'
    },
    {
      "id": 'b12ab5b8-f5af-4a9c-9ad9-a6b167148591',
      "title": "Actividad 4",
      "subtitle": "Hola mundo soy la actividad 4",
      "src": "img_4",
      "status": 1,
      "dateEnd": new Date("12/10/2022"),
      "rolesList": new RolesListActivity(true, false, true, false),
      "projectId": '490602c6-a115-44ec-9bfb-d1d9b9f476d9'
    }
  ]
  constructor() { }
}
