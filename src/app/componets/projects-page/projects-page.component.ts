import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ProjectData } from '../../models/projects';
import { ProjectListService } from '../../services/project-list.service';
import { LoginDataService } from '../../services/login-data.service';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css']
})
export class ProjectsPageComponent implements OnInit {
  createProject: Subject<ProjectData> = new Subject<ProjectData>();
  constructor(public projectList: ProjectListService, public loginData:LoginDataService) { 
  }

  ngOnInit(): void {
  }

  newProject(project: ProjectData) {
    this.projectList.projects.push(project);
  }
}
