import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { filter, Subject } from 'rxjs';
import { ProjectData } from '../../models/projects';
import { LoginDataService } from '../../services/login-data.service';
import { Router } from '@angular/router';
import { ProjectDataService } from 'src/app/services/project-data.service';
import { Title } from '@angular/platform-browser';
import { Lang } from 'src/app/models/lang';
import { LangService } from 'src/app/services/lang.service';
import { Modal } from 'bootstrap';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css']
})
export class ProjectsPageComponent implements OnInit {
  createProject: Subject<ProjectData> = new Subject<ProjectData>();

  public projectList: ProjectData[] = [];
//fitro de busqueda
  public searchTerm: string = '';

  public lang: Lang = new Lang();

  private loadScreenModal!: Modal;
  public isMobile: boolean = false;

  constructor(private projectData: ProjectDataService, private titleService: Title, private breakpointObserver: BreakpointObserver, private langService: LangService) {
    this.titleService.setTitle(`MPM - Projects`)
    this.lang = this.langService.getLang();
    this.breakpointObserver.observe('(max-width: 992px)')
    .subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  ngOnInit(): void {
    this.loadScreenModal = new Modal(document.getElementById('loadScreen') as Element);
    this.loadScreenModal.show(document.body);
    this.projectData.getListProjects().subscribe({
      next: (data: ProjectData[]) => {
        this.projectList = data;
      },
      complete: () => {
        this.loadScreenModal.hide();
      },
      error: () => {
        this.loadScreenModal.hide();
      }
    })
  }

  /*get filteredProjects(): ProjectData[] {
    return this.projectList.filter(project =>
      project.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }*/
  get filteredProjects(): ProjectData[] {
    return this.projectList.filter(project =>
      project.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      project.subtitle.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      project.owner.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
