import { Component, OnInit } from '@angular/core';
import { LoginDataService } from '../../services/login-data.service';
import { Router } from '@angular/router';
import { ProjectDataService } from '../../services/project-data.service';
import { ProjectListService } from '../../services/project-list.service';
import { Title } from '@angular/platform-browser';
import { ProjectData } from 'src/app/models/projects';

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
      this.projectList.getListProjects().subscribe((data: Array<ProjectData>) => {
        const id = data[0].id;
        this.router.navigate(['/project', id]);
      })
    } else {
      this.router.navigate(['/']);
    }
  }

  openMembers() {
    if(this.loginService.isLogin()) {
      this.projectList.getListProjects().subscribe((data: Array<ProjectData>) => {
        const id = data[0].id;
        this.router.navigate(['/project', id, 'members']);
      })
    } else {
      this.router.navigate(['/']);
    }
  }

  // random(min: number, max: number) {
  //   return Math.round(Math.floor(Math.random() * (max - min + 1) + min))
  // }
}
