import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from 'src/app/models/users';
import { LoginDataService } from '../../services/login-data.service';
import { ProjectListService } from '../../services/project-list.service';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isMobile: boolean = false;

  constructor(private router:Router, public loginService:LoginDataService, private projectList:ProjectListService, private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe('(max-width: 992px)')
    .subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  ngOnInit(): void {
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
}