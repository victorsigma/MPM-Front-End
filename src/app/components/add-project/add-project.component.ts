import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { ProjectData } from '../../models/projects';
import { ProjectDataService } from '../../services/project-data.service';
import { LoginDataService } from '../../services/login-data.service';
import { ProjectsHasUser } from '../../models/projectsHasUser';
import { UsersProjectsService } from 'src/app/services/users-projects.service';
import { ProjectListService } from '../../services/project-list.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { LangService } from 'src/app/services/lang.service';
import { Lang } from 'src/app/models/lang';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  form: UntypedFormGroup;
  project: ProjectData = new ProjectData();
  relationProject: ProjectsHasUser = new ProjectsHasUser();

  public lang: Lang = new Lang();

  @Output() newProject: EventEmitter<ProjectData> = new EventEmitter();
  constructor(
    public projectId: ProjectDataService,
    private projectList: ProjectListService,
    public toastr: ToastrService,
    private langService: LangService
  ) {
    this.lang = this.langService.getLang();
    this.form = new UntypedFormGroup(
      {
        title: new UntypedFormControl(),
        subtitle: new UntypedFormControl(),
        dateEnd: new UntypedFormControl()
      }
    );
  }

  ngOnInit(): void {
  }

  createProject(): void {
    this.project = {
      id: '',
      title: this.form.get('title')?.value,
      subtitle: this.form.get('subtitle')?.value,
      src: 'img_' + this.random(1, 7),
      dateStart: new Date(),
      dateEnd: new Date(new Date(this.form.get('dateEnd')?.value)),
      owner: ''
    };

    this.projectList.addProjects(this.project).subscribe({
      next: () => {
        this.toastr.error(this.lang.toast.project_add_ok, this.lang.toast.status_complited)
      },
      complete: () => {
        location.reload()
      },
      error: () => {
        this.toastr.error(this.lang.toast.project_add_ok, this.lang.toast.status_cancel)
      }
    })
  }

  random(min: number, max: number) {
    return Math.round(Math.floor(Math.random() * (max - min + 1) + min))
  }

  reloadForm() {
    this.form = new UntypedFormGroup(
      {
        title: new UntypedFormControl(),
        subtitle: new UntypedFormControl(),
        dateEnd: new UntypedFormControl()
      }
    );
  }
}