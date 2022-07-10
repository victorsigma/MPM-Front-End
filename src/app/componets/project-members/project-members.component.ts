import { Component, OnInit, Input } from '@angular/core';
import { UsersProjectsService } from '../../services/users-projects.service';
import { ProjectData } from 'src/app/models/projects';
import { ProjectsHasUser } from '../../models/projectsHasUser';
import { UpdateDataService } from 'src/app/services/update-data.service';

@Component({
  selector: 'app-project-members',
  templateUrl: './project-members.component.html',
  styleUrls: ['./project-members.component.css']
})
export class ProjectMembersComponent implements OnInit {

  @Input() project:ProjectData = new ProjectData();

  members: ProjectsHasUser[] = [];
  constructor(public memberList:UsersProjectsService, private emitter: UpdateDataService) {
    this.emitter.emitter.subscribe(() => {
      this.reloadMembers();
    });
  }

  ngOnInit(): void {
  }

  updateMembers() {
    this.reloadMembers();
  }

  reloadMembers() {
    this.members = this.memberList.projectMembers.filter(memberList=> {
      return memberList.proyects_id_p == this.project.id
    })
  }
}