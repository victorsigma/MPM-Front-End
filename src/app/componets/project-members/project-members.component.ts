import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { UsersProjectsService } from '../../services/users-projects.service';
import { ProjectData } from 'src/app/models/projects';
import { ProjectsHasUser } from '../../models/projectsHasUser';
import { UpdateDataService } from 'src/app/services/update-data.service';
import { UsersListService } from '../../services/users-list.service';
import { UserData } from '../../models/users';

@Component({
  selector: 'app-project-members',
  templateUrl: './project-members.component.html',
  styleUrls: ['./project-members.component.css']
})
export class ProjectMembersComponent implements OnInit {

  @Input() project:ProjectData = new ProjectData();

  members: ProjectsHasUser[] = [];
  form: UntypedFormGroup = new UntypedFormGroup({
    userName: new UntypedFormControl(),
    userRol: new UntypedFormControl(1)
  });

  memberData: UserData[] = [];
  newMember: ProjectsHasUser = new ProjectsHasUser();

  test: ProjectsHasUser[] = [];
  constructor(public memberList:UsersProjectsService, private emitter: UpdateDataService, private userList: UsersListService) {
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
      return memberList.proyectsIdProject == this.project.id
    })
  }

  addMember() {
    this.memberData = this.userList.usersList.filter(obj => { return obj.userName == this.form.get('userName')?.value});
    if (this.memberData.length != 0) {
      if (this.memberList.projectMembers.filter(data=> { return data.proyectsIdProject == this.project.id && data.userIdUser == this.memberData[0].userId}).length == 0) {
        this.newMember.proyectsIdProject = this.project.id;
        this.newMember.userIdUser = this.memberData[0].userId;
        this.newMember.rolesIdRol = this.form.get('userRol')?.value;
        //this.memberList.projectMembers.push(this.newMember);
        this.memberList.addProjectUser(this.newMember).subscribe(data => {
          this.memberList.getList();
        })
      } else {
        console.log('Usuario Registrado')
      }
    } else {
      console.log('Usuario No Existente')
    }

    this.newMember = new ProjectsHasUser();
    this.form = new UntypedFormGroup({
      userName: new UntypedFormControl(),
      userRol: new UntypedFormControl(1)
    });
  }
}