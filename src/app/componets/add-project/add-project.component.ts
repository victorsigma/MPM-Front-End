import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import {v4 as uuidv4} from 'uuid';
import { ProjectData } from '../../models/projects';
import { ProjectDataService } from '../../services/project-data.service';
import { LoginDataService } from '../../services/login-data.service';
import { ProjectsHasUser } from '../../models/projectsHasUser';
import { UsersProjectsService } from 'src/app/services/users-projects.service';
import { ProjectListService } from '../../services/project-list.service';
import { Router } from '@angular/router';

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
    private userLoging:LoginDataService, 
    private memberList:UsersProjectsService, 
    private projectList:ProjectListService,
    private router:Router
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
      id: uuidv4(),
      title: this.form.get('title')?.value,
      subtitle: this.form.get('subtitle')?.value,
      src: 'img_'+this.random(1, 7),
      dateStart: new Date(),
      dateEnd: new Date(new Date(this.form.get('dateEnd')?.value))
    };

    this.relationProject = {
      id: 0,
      proyectsIdProject: this.project.id,
      userIdUser: this.userLoging.usersList[0].userId,
      rolesIdRol: 0
    }
    //
    this.projectList.addProjects(this.project).subscribe(data => {
      this.form.reset();
      //this.projectList.projectsMaster.push(this.project);
    })
    this.memberList.addProjectUser(this.relationProject).subscribe(data => {
      //this.memberList.projectMembers.push(this.relationProject)
      this.reloadForm();
    })

    
    
    //this.router.navigate(['/projects']);


    this.memberList.getListProjectUser().subscribe(async data => {
      this.memberList.projectMembers = await data;
    })
    this.projectList.getListProjects().subscribe(async data => {
      this.projectList.projectsMaster = await data;
    })

    this.projectList.loadProjects();
    this.router.navigate(['/']);
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