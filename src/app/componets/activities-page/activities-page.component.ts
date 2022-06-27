import { Component, OnInit } from '@angular/core';
import { RolesListActivity } from 'src/app/models/roles';
import { ToastrService } from 'ngx-toastr';
import { ActivityData } from '../../models/ativities';
import { LsActivityService } from '../../services/ls-activity.service';
import { ActivityDataService } from '../../services/activity-data.service';
import { ProjectData } from 'src/app/models/projects';
import { ProjectDataService } from 'src/app/services/project-data.service';

@Component({
  selector: 'app-activities-page',
  templateUrl: './activities-page.component.html',
  styleUrls: ['./activities-page.component.css']
})
export class ActivitiesPageComponent implements OnInit {

  activities: ActivityData[] = [
    {
      "id": 0,
      "title": "Actividad 1",
      "subtitle": "Actividad de pruebas",
      "src": "img_1",
      "status": 3,
      "dateEnd": new Date("07/16/2022"),
      "rolesList": new RolesListActivity(true, true, true, false),
      "projectId": 1
    },
    {
      "id": 1,
      "title": "Actividad 2",
      "subtitle": "Segunda Actividad",
      "src": "img_2",
      "status": 1,
      "dateEnd": new Date("12/28/2022"),
      "rolesList": new RolesListActivity(true, true, true, true),
      "projectId": 0
    },
    {
      "id": 2,
      "title": "Actividad 3",
      "subtitle": "Jaja soy la actividad 3",
      "src": "img_3",
      "status": 2,
      "dateEnd": new Date("09/24/2022"),
      "rolesList": new RolesListActivity(true, false, false, false),
      "projectId": 0
    },
    {
      "id": 3,
      "title": "Actividad 4",
      "subtitle": "Hola mundo soy la actividad 4",
      "src": "img_4",
      "status": 1,
      "dateEnd": new Date("12/10/2022"),
      "rolesList": new RolesListActivity(true, false, true, false),
      "projectId": 0
    }
  ]

  activitiesUn: ActivityData[] = [];
  activitiesIn: ActivityData[] = [];
  activitiesCm: ActivityData[] = [];
  project:ProjectData = new ProjectData();

  constructor(
    private activityId: LsActivityService,
    private toastr: ToastrService,
    private dataActivities: ActivityDataService,
    public projectData:ProjectDataService
  ) {
    this.reloadActivities();
    this.project = this.projectData.project;
  }

  ngOnInit(): void {
  }

  test() {
    console.log(this.activityId.activity)
  }

  newActivity(activity: ActivityData) {
    this.activities.push(activity);
    console.log(activity);
    this.reloadActivities();
    this.toastr.success(activity.subtitle, 'Add ' + activity.title);
  }

  deletActivity(index: number) {
    this.activities.splice(index, 1);
    this.reloadActivities();
    this.toastr.error('The activity was eliminated.', 'Remove Activity');
  }

  reloadActivities() {
    this.activitiesUn = this.activities.filter((obj) => {
      return obj.status == 1;
    })
    this.activitiesIn = this.activities.filter((obj) => {
      return obj.status == 2;
    })
    this.activitiesCm = this.activities.filter((obj) => {
      return obj.status == 3;
    })
    this.activityId.activity = this.activities.length;
    this.dataActivities.activities = this.activities;
  }
}
