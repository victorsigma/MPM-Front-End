import { Component, OnInit } from '@angular/core';
import { LoginDataService } from '../../services/login-data.service';
import { Router } from '@angular/router';
import { ProjectDataService } from '../../services/project-data.service';
import { ProjectListService } from '../../services/project-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLogin: boolean;
  constructor(public loginData: LoginDataService, private router:Router, private projectData: ProjectDataService, private projectList: ProjectListService) { 
    this.isLogin = this.loginData.isLogin;
    if(this.loginData.isLogin) {
      this.projectList.loadProjects();
    }
  }

  ngOnInit(): void {
    if(this.loginData.isLogin) {
      this.projectList.loadProjects();
    }
  }


  openProjects() {
    if(this.loginData.isLogin) {
      this.router.navigate(['/projects']);
    } else {
      this.router.navigate(['/']);
    }
  }

  openActivity() {
    if(this.loginData.isLogin) {
      this.projectList.loadProjects();
      console.log(this.projectList.projects.length)
      console.log(this.random(0,this.projectList.projects.length))
      this.projectData.project = this.projectList.projects[this.random(0,(this.projectList.projects.length-1))];
      this.router.navigate(['/activities']);
    } else {
      this.router.navigate(['/']);
    }
  }

  random(min: number, max: number) {
    return Math.round(Math.floor(Math.random() * (max - min + 1) + min))
  }
}
