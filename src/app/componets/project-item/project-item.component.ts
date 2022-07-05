import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectData } from '../../models/projects';
import { ProjectDataService } from '../../services/project-data.service';
import { LoginDataService } from '../../services/login-data.service';
import { UsersProjectsService } from '../../services/users-projects.service';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit {

  @Input() project:ProjectData = new ProjectData();
  constructor(private router:Router, private projectData: ProjectDataService, public loginData: LoginDataService, ProjectUser: UsersProjectsService) { 
    this.projectData.project = this.project;
  }

  ngOnInit(): void {
  }

  openActivities(): void {
    this.projectData.project = this.project;
    this.router.navigate(['/activities']);
  }
}
