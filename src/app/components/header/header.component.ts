import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDataService } from '../../services/login-data.service';
import { ProjectListService } from '../../services/project-list.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { accountPaths, defaultPaths, membersPaths, projectPaths, projectsPaths } from 'src/app/libs/paths';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isMobile: boolean = false;
  public userIcon: string = '';
  public userName: string = '';
  public iconPathSmall: string = `${environment.apiKey}api/user-icon/small/`
  public slideStyle: boolean = false;
  public paths: any = defaultPaths;
  public patherPath: string = ''

  constructor(private router:Router, public loginService:LoginDataService, private projectList:ProjectListService, private breakpointObserver: BreakpointObserver) {
    this.slideStyle = localStorage.getItem('slideStyle') == 'true' ? true : false;
    this.breakpointObserver.observe('(max-width: 992px)')
    .subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  ngOnInit(): void {
    this.userIcon = `${this.loginService.getUserInfo().userIcon}.jpg`;
    this.userName = this.loginService.getUserInfo().userName;
    this.router.events.subscribe(() => {
      if(this.router.url === '/') {
        this.paths = defaultPaths;
      }
      if(this.router.url.includes('projects')) {
        this.paths = projectsPaths;
      }
      if(this.router.url.includes('project/')) {
        this.paths = projectPaths;
      }
      if(this.router.url.includes('members')) {
        this.paths = membersPaths;
      }
      if(this.router.url.includes('account')) {
        this.paths = accountPaths;
      }
    })
  }


  logout(): void {
    this.loginService.loggout()
  }

  updateLogin(): void {
    this.router.navigate(['/reload']);
  }

  loginDate(): void {
    this.updateLogin();
  }

  reloadProjects() {
    this.projectList.loadProjects();
  }
  

  sliderChange() {
    if(this.isMobile) return;
    this.slideStyle = !this.slideStyle;
    localStorage.setItem('slideStyle', `${this.slideStyle}`);
  }
}