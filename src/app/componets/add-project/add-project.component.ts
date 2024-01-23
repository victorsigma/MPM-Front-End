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

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  form: UntypedFormGroup;
  project: ProjectData = new ProjectData();
  relationProject: ProjectsHasUser = new ProjectsHasUser();

  @Output() newProject: EventEmitter<ProjectData> = new EventEmitter();
  constructor(
    public projectId: ProjectDataService, 
    private projectList:ProjectListService,
    public toastr: ToastrService
    ) {
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
      src: 'img_'+this.random(1, 7),
      dateStart: new Date(),
      dateEnd: new Date(new Date(this.form.get('dateEnd')?.value)),
      owner: ''
    };

    this.projectList.addProjects(this.project).subscribe(data => {
      location.reload()
    }, error => {
      this.toastr.error('Error creating the project')
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