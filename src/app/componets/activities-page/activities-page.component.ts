import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ActivityData } from '../../models/ativities';
import { ActivityDataService } from '../../services/activity-data.service';
import { ProjectData } from 'src/app/models/projects';
import { ProjectDataService } from 'src/app/services/project-data.service';
import { ActivityListService } from '../../services/activity-list.service';
import { LoginDataService } from '../../services/login-data.service';
import { UpdateDataService } from '../../services/update-data.service';

@Component({
  selector: 'app-activities-page',
  templateUrl: './activities-page.component.html',
  styleUrls: ['./activities-page.component.css']
})
export class ActivitiesPageComponent implements OnInit {
  project: ProjectData = new ProjectData();

  public update: Subject<void> = new Subject<void>();
  constructor(
    private toastr: ToastrService,
    private dataActivities: ActivityDataService,
    public projectData: ProjectDataService,
    public activityList: ActivityListService,
    public loginData: LoginDataService,
    private emitter: UpdateDataService
  ) {
    this.reloadActivities();
    this.project = this.projectData.project;
  }

  ngOnInit(): void {
  }

  test() {
  }

  newActivity(activity: ActivityData) {
    this.activityList.activities.push(activity);
    console.log(activity);
    this.reloadActivities();
    this.activityList.reloadActivities();
    this.toastr.success(activity.subtitle, 'Add ' + activity.title);
  }

  deletActivity(index: number) {
    this.activityList.activities.splice(index, 1);
    this.reloadActivities();
    this.activityList.reloadActivities();
    this.toastr.error('The activity was eliminated.', 'Remove Activity');
  }

  reloadActivities() {
    this.dataActivities.activities = this.activityList.activities;
  }

  updateData() {
    this.emitter.emitirEvento();
  }
}