import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectData } from 'src/app/models/projects';
import { ProjectsHasUser } from 'src/app/models/projectsHasUser';
import { LoginDataService } from 'src/app/services/login-data.service';
import { ProjectListService } from 'src/app/services/project-list.service';
import { UsersProjectsService } from 'src/app/services/users-projects.service';
import { Router } from '@angular/router';
import { ActivityData } from '../../models/ativities';
import { ActivityDataService } from '../../services/activity-data.service';
import { LangService } from 'src/app/services/lang.service';
import { Lang } from 'src/app/models/lang';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.css']
})
export class DeleteProjectComponent implements OnInit {


  @Input() project: ProjectData = new ProjectData();
  members: ProjectsHasUser[] = [];
  activities: ActivityData[] = [];
  form: FormGroup = new FormGroup({
    title: new FormControl
  });

  public lang: Lang = new Lang();
  constructor(
    private projectList: ProjectListService,
    private memberList: UsersProjectsService,
    private activityData: ActivityDataService,
    private langService: LangService,
    private route: Router
  ) {
    this.lang = this.langService.getLang();
  }

  ngOnInit(): void {
  }

  deleteProject(): void {

    console.log(this.form.get('title')?.value)

    if (this.form.get('title')?.value == this.project.title) {
      this.projectList.removeProjects(this.project.id).subscribe(()=> {
        this.route.navigate(['/projects']);
      });
    }
  }

  reloadForm() {
    this.form = new FormGroup({
      title: new FormControl
    });
  }
}
