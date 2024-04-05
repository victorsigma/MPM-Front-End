import { Component, OnInit } from '@angular/core';
import { LoginDataService } from '../../services/login-data.service';
import { Router } from '@angular/router';
import { ProjectDataService } from '../../services/project-data.service';
import { ProjectListService } from '../../services/project-list.service';
import { Title } from '@angular/platform-browser';
import { ProjectData } from 'src/app/models/projects';
import { LangService } from 'src/app/services/lang.service';
import { Lang } from 'src/app/models/lang';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public lang: Lang = new Lang();
  public isMobile: boolean = false;
  public activityUrl: string = '';
  constructor(private breakpointObserver: BreakpointObserver, public loginService: LoginDataService, private router: Router, private projectData: ProjectDataService, private projectList: ProjectListService, private titleService: Title, private langService: LangService) {
    this.titleService.setTitle(`MPM - Home`)
    this.lang = this.langService.getLang();


    if (this.loginService.isLogin()) {
      this.projectList.getListProjects().subscribe((data: Array<ProjectData>) => {
        const id = data[0].id;
        this.activityUrl = this.router.createUrlTree(['/project', id]).toString();
      })
    } else {
      this.activityUrl = '';
    }

    this.breakpointObserver.observe('(max-width: 992px)')
      .subscribe(result => {
        this.isMobile = result.matches;
      });
  }


  ngOnInit(): void {

  }
  // random(min: number, max: number) {
  //   return Math.round(Math.floor(Math.random() * (max - min + 1) + min))
  // }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
