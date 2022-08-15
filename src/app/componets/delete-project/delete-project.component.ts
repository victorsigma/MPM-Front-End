import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AES, enc } from 'crypto-js';
import { ProjectData } from 'src/app/models/projects';
import { ProjectsHasUser } from 'src/app/models/projectsHasUser';
import { LoginDataService } from 'src/app/services/login-data.service';
import { ProjectListService } from 'src/app/services/project-list.service';
import { UsersProjectsService } from 'src/app/services/users-projects.service';
import { UsersListService } from '../../services/users-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.css']
})
export class DeleteProjectComponent implements OnInit {


  @Input() project: ProjectData = new ProjectData();
  members: ProjectsHasUser[] = [];
  form: FormGroup = new FormGroup({
    password: new FormControl
  });
  constructor(
    private userLoging: LoginDataService,
    private userList: UsersListService,
    private projectList: ProjectListService,
    private memberList: UsersProjectsService,
    private route: Router
  ) {
  }

  ngOnInit(): void {
  }

  deleteProject(): void {
    if (this.validation()) {
      this.members = this.memberList.projectMembers.filter(memberList => {
        return memberList.proyectsIdProject == this.project.id
      })
      console.log(this.members)
      this.members.forEach(element => {
        console.log(element)
        this.memberList.removeProjectUser(element.id).subscribe();
      })

      this.projectList.removeProjects(this.project.id).subscribe(()=> {
        this.projectList.loadProjects();
        this.memberList.getList();
      });
      this.route.navigate(['/']);
    }
  }

  validation(): boolean {
    return (AES.decrypt(this.userLoging.usersList[0].password, this.userList.encryptionKey).toString(enc.Utf8) === this.form.get('password')?.value)
  }

  reloadForm() {
    this.form = new FormGroup({
      password: new FormControl
    });
  }
}
