import { Component, OnInit } from '@angular/core';
import { LoginDataService } from '../../services/login-data.service';
import { Router } from '@angular/router';
import { ProjectDataService } from '../../services/project-data.service';
import { ProjectListService } from '../../services/project-list.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public loginService: LoginDataService, private router:Router, private projectData: ProjectDataService, private projectList: ProjectListService, private titleService: Title) { 
    this.titleService.setTitle(`MPM - Home`)
  }

  ngOnInit(): void {

  }


  openProjects() {

  }

  openActivity() {
    if(this.loginService.isLogin()) {
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
