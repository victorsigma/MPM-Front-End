import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from 'src/app/models/users';
import { LoginDataService } from '../../services/login-data.service';
import { ProjectListService } from '../../services/project-list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router, public loginService:LoginDataService, private projectList:ProjectListService) {
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