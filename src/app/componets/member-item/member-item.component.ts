import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserData } from '../../models/users';
import { ProjectsHasUser } from 'src/app/models/projectsHasUser';
import { UpdateDataService } from 'src/app/services/update-data.service';
import { UsersListService } from '../../services/users-list.service';
import { UsersProjectsService } from 'src/app/services/users-projects.service';

@Component({
  selector: 'app-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.css']
})
export class MemberItemComponent implements OnInit {

  @Input() member:ProjectsHasUser = new ProjectsHasUser();
  @Output() updateMembers:EventEmitter<null> = new EventEmitter<null>();
  users: UserData[] = [];
  user: UserData = new UserData;
  userRol: string = '';
  constructor(private emitter: UpdateDataService, private userFilter: UsersListService, private memberList:UsersProjectsService) { 
    this.emitter.emitter.subscribe(() => {
      this.updateDate();
    });
  }

  ngOnInit(): void {
  }

  updateDate() {
    this.users = this.userFilter.usersList.filter(data => {
      return data.userId == this.member.user_id_user
    })

    this.user = this.users[0];

    if (this.member.roles_id_rol == 0) {
      this.userRol = 'Leader'
    }

    if (this.member.roles_id_rol == 1) {
      this.userRol = 'Analyst'
    }

    if (this.member.roles_id_rol == 2) {
      this.userRol = 'Designer'
    }

    if (this.member.roles_id_rol == 3) {
      this.userRol = 'Programmer'
    }
  }

  deletedMember() {
    this.memberList.projectMembers.splice(this.memberList.projectMembers.indexOf(this.member), 1);
    this.updateMembers.emit();
  }
}