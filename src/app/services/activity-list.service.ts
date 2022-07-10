import { Injectable } from '@angular/core';
import { RolesListActivity } from 'src/app/models/roles';
import { ActivityData } from '../models/ativities';
import { ProjectsHasUser } from '../models/projectsHasUser';
import { UsersProjectsService } from './users-projects.service';
import { LoginDataService } from './login-data.service';
import { ProjectDataService } from './project-data.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityListService {

  activitiesMaster: ActivityData[] = [
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

  activities: ActivityData[] = [];
  activitiesUn: ActivityData[] = [];
  activitiesIn: ActivityData[] = [];
  activitiesCm: ActivityData[] = [];

  loginRol: ProjectsHasUser[] = [];
  constructor(private userMember: UsersProjectsService, private loginData: LoginDataService, public projectData: ProjectDataService,) {
    this.filterRol();
  }

  filterRol() {
    this.loginRol = this.userMember.projectMembers.filter(data => {
      return data.proyects_id_p == this.projectData.project.id && data.user_id_user == this.loginData.usersList[0].userId
    })
    if (this.loginRol[0].roles_id_rol == 0) {
      this.leaderActivitis();
    }
    if (this.loginRol[0].roles_id_rol == 1) {
      this.analystActivitis();
    }
    if (this.loginRol[0].roles_id_rol == 2) {
      this.designerActivitis();
    }
    if (this.loginRol[0].roles_id_rol == 3) {
      this.programmerActivitis();
    }
  }

  leaderActivitis() {
    this.activities = this.activitiesMaster.filter(data=> {
      return data.rolesList.Leader == true;
    })

    this.activitiesCm = this.activitiesMaster.filter(data=> {
      return data.rolesList.Leader == true && data.status == 3;
    })

    this.activitiesIn = this.activitiesMaster.filter(data=> {
      return data.rolesList.Leader == true && data.status == 2;
    })

    this.activitiesUn = this.activitiesMaster.filter(data=> {
      return data.rolesList.Leader == true && data.status == 1;
    })
  }

  analystActivitis() {
    this.activities = this.activitiesMaster.filter(data=> {
      return data.rolesList.Analyst == true;
    })

    this.activitiesCm = this.activitiesMaster.filter(data=> {
      return data.rolesList.Analyst == true && data.status == 3;
    })

    this.activitiesIn = this.activitiesMaster.filter(data=> {
      return data.rolesList.Analyst == true && data.status == 2;
    })

    this.activitiesUn = this.activitiesMaster.filter(data=> {
      return data.rolesList.Analyst == true && data.status == 1;
    })
  }

  designerActivitis() {
    this.activities = this.activitiesMaster.filter(data=> {
      return data.rolesList.Designer == true;
    })

    this.activitiesCm = this.activitiesMaster.filter(data=> {
      return data.rolesList.Designer == true && data.status == 3;
    })

    this.activitiesIn = this.activitiesMaster.filter(data=> {
      return data.rolesList.Designer == true && data.status == 2;
    })

    this.activitiesUn = this.activitiesMaster.filter(data=> {
      return data.rolesList.Designer == true && data.status == 1;
    })
  }

  programmerActivitis() {
    this.activities = this.activitiesMaster.filter(data=> {
      return data.rolesList.Programmer == true;
    })

    this.activitiesCm = this.activitiesMaster.filter(data=> {
      return data.rolesList.Programmer == true && data.status == 3;
    })

    this.activitiesIn = this.activitiesMaster.filter(data=> {
      return data.rolesList.Programmer == true && data.status == 2;
    })

    this.activitiesUn = this.activitiesMaster.filter(data=> {
      return data.rolesList.Programmer == true && data.status == 1;
    })
  }
}
