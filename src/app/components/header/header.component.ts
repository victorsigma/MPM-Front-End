import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDataService } from '../../services/login-data.service';
import { ProjectListService } from '../../services/project-list.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { accountPaths, defaultPaths, editActivitiesPaths, membersPaths, projectPaths, projectsPaths } from 'src/app/libs/paths';
import { environment } from 'src/environments/environment';
import { Lang } from 'src/app/models/lang';
import { LangService } from 'src/app/services/lang.service';
import { routes } from 'src/app/libs/search-routes';

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
  public appIcon: string = '';
  //fitro de busqueda
  public searchTerm: string = '';

  private routes: Array<{title: string, path: string}> = [];

  public lang: Lang = new Lang();
  constructor(public router:Router, public loginService:LoginDataService, private projectList:ProjectListService, private breakpointObserver: BreakpointObserver, private langService: LangService) {
    this.lang = this.langService.getLang();
    this.appIcon = document.body.getAttribute('data-bs-theme') == 'default' ? 'assets/img/mpm-logo-dark.png' : 'assets/img/mpm-logo-light.png';
    this.slideStyle = localStorage.getItem('slideStyle') == 'true' ? true : false;
    this.routes = routes
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
      } else if(this.router.url.includes('error')) {
        this.paths = defaultPaths;
      } else if(this.router.url.includes('projects')) {
        this.paths = projectsPaths;
      } else if(this.router.url.includes('members')) {
        this.paths = membersPaths;
      } else if(this.router.url.includes('project/')) {
        this.paths = projectPaths;
      } else if(this.router.url.includes('verify')) {
        this.paths = defaultPaths;
      } else if(this.router.url.includes('account')) {
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

  get filteredRoutes(): Array<{title: string, path: string}> {
    if(this.searchTerm !== '') {
      return this.routes.filter(route =>
        route.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      return [];
    }
  }


  handleInput(dropdown: HTMLUListElement) {
    console.log('select')
    dropdown.style.background = '#fff !important'
  }

  handleEnter() {
    
  }
}