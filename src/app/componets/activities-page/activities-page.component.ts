import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivityData } from '../../models/ativities';
import { ActivityDataService } from '../../services/activity-data.service';
import { ProjectData } from 'src/app/models/projects';
import { ProjectDataService } from 'src/app/services/project-data.service';
import { ActivityListService } from '../../services/activity-list.service';

@Component({
  selector: 'app-activities-page',
  templateUrl: './activities-page.component.html',
  styleUrls: ['./activities-page.component.css']
})
export class ActivitiesPageComponent implements OnInit {
  activitiesUn: ActivityData[] = [];
  activitiesIn: ActivityData[] = [];
  activitiesCm: ActivityData[] = [];
  project:ProjectData = new ProjectData();

  constructor(
    private toastr: ToastrService,
    private dataActivities: ActivityDataService,
    public projectData: ProjectDataService,
    public activyList: ActivityListService
  ) {
    this.reloadActivities();
    this.project = this.projectData.project;
  }

  ngOnInit(): void {
  }

  test() {
  }

  newActivity(activity: ActivityData) {
    this.activyList.activities.push(activity);
    console.log(activity);
    this.reloadActivities();
    this.toastr.success(activity.subtitle, 'Add ' + activity.title);
  }

  deletActivity(index: number) {
    this.activyList.activities.splice(index, 1);
    this.reloadActivities();
    this.toastr.error('The activity was eliminated.', 'Remove Activity');
  }

  reloadActivities() {
    this.activitiesUn = this.activyList.activities.filter((obj) => {
      return obj.status == 1;
    })
    this.activitiesIn = this.activyList.activities.filter((obj) => {
      return obj.status == 2;
    })
    this.activitiesCm = this.activyList.activities.filter((obj) => {
      return obj.status == 3;
    })
    this.dataActivities.activities = this.activyList.activities;
  }
}
