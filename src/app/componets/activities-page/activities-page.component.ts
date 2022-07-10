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

@Component({
  selector: 'app-activities-page',
  templateUrl: './activities-page.component.html',
  styleUrls: ['./activities-page.component.css']
})
export class ActivitiesPageComponent implements OnInit {
  project: ProjectData = new ProjectData();

  public update: Subject<void> = new Subject<void>();
  loginRol:  ProjectsHasUser[] = [];
  constructor(
    private toastr: ToastrService,
    private dataActivities: ActivityDataService,
    public projectData: ProjectDataService,
    public activityList: ActivityListService,
    public loginData: LoginDataService,
    private emitter: UpdateDataService,
    private members: UpdateDataService,
    private userMember: UsersProjectsService
  ) {
    this.filterRol();
    this.project = this.projectData.project;

    this.loginRol = this.userMember.projectMembers.filter(data => {
      return data.proyects_id_p == projectData.project.id && data.user_id_user == loginData.usersList[0].userId
    })

  }

  ngOnInit(): void {
  }

  newActivity(activity: ActivityData) {
    this.activityList.activitiesMaster.push(activity);
    console.log(activity);
    this.filterRol();
    this.toastr.success(activity.subtitle, 'Add ' + activity.title);
  }

  deletActivity(index: number) {
    this.activityList.activitiesMaster.splice(index, 1);
    this.filterRol();
    this.toastr.error('The activity was eliminated.', 'Remove Activity');
  }

  filterRol() {
    this.activityList.filterRol();
    this.dataActivities.activities = this.activityList.activitiesMaster;
  }

  updateData() {
    this.emitter.emitirEvento();
  }

  updateMembers() {
    this.members.emitirEvento();
  }
}