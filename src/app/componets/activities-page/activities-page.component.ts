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
import { UsersProjectsService } from 'src/app/services/users-projects.service';
import { ProjectsHasUser } from 'src/app/models/projectsHasUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activities-page',
  templateUrl: './activities-page.component.html',
  styleUrls: ['./activities-page.component.css']
})
export class ActivitiesPageComponent implements OnInit {
  project: ProjectData = new ProjectData();

  public update: Subject<void> = new Subject<void>();
  loginRol: ProjectsHasUser[] = [];

  activitiesMaster: ActivityData[] = []

  activities: ActivityData[] = [];
  activitiesUn: ActivityData[] = [];
  activitiesIn: ActivityData[] = [];
  activitiesCm: ActivityData[] = [];

  constructor(
    private toastr: ToastrService,
    private dataActivities: ActivityDataService,
    public projectData: ProjectDataService,
    public activityList: ActivityListService,
    public loginService: LoginDataService,
    private emitter: UpdateDataService,
    private members: UpdateDataService,
    private userMember: UsersProjectsService,
    private route:Router
  ) {
    this.filterRol();
    this.project = this.projectData.project;
  }

  ngOnInit(): void {
    this.filterRol()
  }

  newActivity(activity: ActivityData) {
    this.activityList.activitiesMaster.push(activity);

    this.activityList.addActivity(activity).subscribe(data => {
      this.filterRol();
      this.toastr.info(activity.subtitle, 'Add ' + activity.title);
    })
  }

  deletActivity(id: string) {
    this.activityList.removeActivity(id).subscribe(data => {
      this.filterRol();
      this.toastr.error('The activity was eliminated.', 'Remove Activity');
    })
  }

  updateActivity(activity: ActivityData) {
    this.activityList.updateActivity(activity.id, activity).subscribe(data => {
      this.filterRol();
    })
  }

  filterRol() {
    this.activityList.getListActivities().subscribe(data => {
      this.activityList.activitiesMaster = data;
      this.dataActivities.activities = this.activityList.activitiesMaster;
      this.activityList.filterRol();
    })
  }

  updateData() {
    this.emitter.emitirEvento();
  }

  updateMembers() {
    this.members.emitirEvento();
  }
}