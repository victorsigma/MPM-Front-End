import { Component, OnInit } from '@angular/core';
import { filter, Subject } from 'rxjs';
import { ProjectData } from '../../models/projects';
import { ProjectListService } from '../../services/project-list.service';
import { LoginDataService } from '../../services/login-data.service';
import { UsersProjectsService } from 'src/app/services/users-projects.service';

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
    this.projectList.loadProjects();
  }
}
