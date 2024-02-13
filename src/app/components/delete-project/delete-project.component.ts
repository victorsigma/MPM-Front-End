import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ProjectData } from 'src/app/models/projects';
import { ProjectsHasUser } from 'src/app/models/projectsHasUser';
import { LoginDataService } from 'src/app/services/login-data.service';
import { ProjectListService } from 'src/app/services/project-list.service';
import { UsersProjectsService } from 'src/app/services/users-projects.service';
import { Router } from '@angular/router';
import { ActivityData } from '../../models/ativities';
import { ActivityDataService } from '../../services/activity-data.service';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.css']
})
export class DeleteProjectComponent implements OnInit {


  @Input() project: ProjectData = new ProjectData();
  members: ProjectsHasUser[] = [];
  activities: ActivityData[] = [];
  form: UntypedFormGroup = new UntypedFormGroup({
    password: new UntypedFormControl
  });
  constructor(
    private loginService: LoginDataService,
    private projectList: ProjectListService,
    private memberList: UsersProjectsService,
    private activityData: ActivityDataService,
    private route: Router
  ) {
  }

  ngOnInit(): void {
  }

  deleteProject(): void {
    if (this.validation()) {
      this.members = this.memberList.projectMembers.filter(memberList => {
        return memberList.proyectsIdProject == this.project.id;
      })
      // this.activities = this.activityData.activitiesMaster.filter(activityData: any => {
      //   return activityData.projectId == this.project.id;
      // })

      this.members.forEach(element => {
        this.memberList.removeProjectUser(element.id).subscribe();
      })

      this.activities.forEach(element => {
        this.activityData.removeActivity(element.id).subscribe();
      })

      this.projectList.removeProjects(this.project.id).subscribe(()=> {
        this.projectList.loadProjects();
        this.memberList.getList();
      });
      this.route.navigate(['/']);
    }
  }

  validation(): boolean {
    return true //(AES.decrypt(this.loginService.usersList[0].password, this.userList.encryptionKey).toString(enc.Utf8) === this.form.get('password')?.value)
  }

  reloadForm() {
    this.form = new UntypedFormGroup({
      password: new UntypedFormControl
    });
  }
}
