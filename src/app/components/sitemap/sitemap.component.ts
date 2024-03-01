import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Lang } from 'src/app/models/lang';
import { ProjectData } from 'src/app/models/projects';
import { LangService } from 'src/app/services/lang.service';
import { LoginDataService } from 'src/app/services/login-data.service';
import { ProjectDataService } from 'src/app/services/project-data.service';
import { ProjectListService } from 'src/app/services/project-list.service';

@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.css']
})
export class SitemapComponent {

  public lang: Lang = new Lang();
  public activityUrl: string = '';
  constructor(public loginService: LoginDataService, private router: Router, private projectData: ProjectDataService, private projectList: ProjectListService, private titleService: Title, private langService: LangService) {
    this.titleService.setTitle(`MPM - Site Map`)
    this.lang = this.langService.getLang();
    if (this.loginService.isLogin()) {
      this.projectList.getListProjects().subscribe((data: Array<ProjectData>) => {
        const id = data[0].id;
        this.activityUrl = this.router.createUrlTree(['/project', id]).toString();
      })
    } else {
      this.activityUrl = '';
    }
  }
}
