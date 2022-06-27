import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ProjectData } from '../../models/projects';
import { ProjectDataService } from 'src/app/services/project-data.service';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css']
})
export class ProjectsPageComponent implements OnInit {

  projects:ProjectData[] = [
    {
      'id': 0,
      'title': 'Project MPM',
      'subtitle': 'Proyecto de Intregradora I',
      'src': 'img_6',
      'dateStart': new Date("06/26/2022"),
      'dateEnd':new Date("07/20/2022")
    },
    {
      'id': 1,
      'title': 'Project 2',
      'subtitle': 'Proyecto de Prueba',
      'src': 'img_3',
      'dateStart': new Date("06/26/2022"),
      'dateEnd':new Date("07/20/2022")
    }
  ]

  createProject: Subject<ProjectData> = new Subject<ProjectData>();
  constructor(private projectId: ProjectDataService) { 
    this.reloadProjects();
  }

  ngOnInit(): void {
  }

  newProject(project: ProjectData) {
    this.projects.push(project);
    this.reloadProjects();
  }

  reloadProjects() {
    this.projectId.lsProject = this.projects.length;
  }
}
