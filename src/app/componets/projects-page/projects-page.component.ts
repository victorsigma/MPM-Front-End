import { Component, OnInit } from '@angular/core';
import { filter, Subject } from 'rxjs';
import { ProjectData } from '../../models/projects';
import { LoginDataService } from '../../services/login-data.service';
import { Router } from '@angular/router';
import { ProjectDataService } from 'src/app/services/project-data.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css']
})
export class ProjectsPageComponent implements OnInit {
  createProject: Subject<ProjectData> = new Subject<ProjectData>();

  public projectList: ProjectData[] = []; 

  constructor(private projectData: ProjectDataService, private titleService: Title) {
    this.titleService.setTitle(`MPM - Projects`)
    this.projectData.getListProjects().subscribe((data: ProjectData[]) => {
      this.projectList = data;
    })
  }

  ngOnInit(): void {

  }
}
