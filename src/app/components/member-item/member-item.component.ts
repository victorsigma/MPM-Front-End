import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectUserData } from 'src/app/models/projectsHasUser';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectDataService } from 'src/app/services/project-data.service';
import unMatchFieldsValidator from 'src/app/validators/unMatchRoleValidators';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LangService } from 'src/app/services/lang.service';
import { Lang } from 'src/app/models/lang';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';

@Component({
  selector: 'app-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.css']
})
export class MemberItemComponent implements OnInit {

  @Input() member: ProjectUserData = new ProjectUserData();
  @Output() updateMembers: EventEmitter<null> = new EventEmitter<null>();
  public iconPathFull: string = `${environment.apiKey}api/user-icon/full/`


  actualRole: number = 0;

  public form: FormGroup = new FormGroup({
    userRole: new FormControl(0, [unMatchFieldsValidator(this.actualRole)])
  });

  public lang: Lang = new Lang();
  constructor(private projectData: ProjectDataService, private activeRoute: ActivatedRoute, private langService: LangService, private toastr: ToastrService) {
    this.lang = this.langService.getLang();
  }

  ngOnInit(): void {
    switch (this.member.rolName) {
      case 'Analyst':
        this.actualRole = 1;
        this.form = new FormGroup({
          userRole: new FormControl(1, [unMatchFieldsValidator(this.actualRole)])
        });
        break;
      case 'Designer':
        this.actualRole = 2;
        this.form = new FormGroup({
          userRole: new FormControl(2, [unMatchFieldsValidator(this.actualRole)])
        });
        break;
      case 'Programmer':
        this.actualRole = 3;
        this.form = new FormGroup({
          userRole: new FormControl(3, [unMatchFieldsValidator(this.actualRole)])
        });
        break;
    }
  }

  deletedMember() {
    const { idProject } = this.activeRoute.snapshot.params
    this.projectData.removeProjectUser(this.member.userName, idProject).subscribe({
      next: () => {
        this.toastr.success(this.lang.toast.delete_ok, this.lang.toast.status_complited)
      },
      complete: () => {
        location.reload()
      },
      error: () => {
        this.toastr.error(this.lang.toast.delete_error, this.lang.toast.status_cancel)
      }
    })
  }

  updateMember() {
    const { idProject } = this.activeRoute.snapshot.params
    const newRol = this.form.get('userRole')?.value;
    if (this.actualRole != this.form.get('userRole')?.value) {
      this.projectData.updateProjectUser(this.member.userName, idProject, newRol).subscribe({
        next: (data) => {
          this.member = data;

          switch (this.member.rolName) {
            case 'Analyst':
              this.actualRole = 1;
              this.form = new FormGroup({
                userRole: new FormControl(1, [unMatchFieldsValidator(this.actualRole)])
              });
              break;
            case 'Designer':
              this.actualRole = 2;
              this.form = new FormGroup({
                userRole: new FormControl(2, [unMatchFieldsValidator(this.actualRole)])
              });
              break;
            case 'Programmer':
              this.actualRole = 3;
              this.form = new FormGroup({
                userRole: new FormControl(3, [unMatchFieldsValidator(this.actualRole)])
              });
              break;
          }

          this.toastr.success(this.lang.toast.update_ok, this.lang.toast.status_complited);
        },
        error: (error) => {
          this.toastr.error(this.lang.toast.update_error, this.lang.toast.status_cancel);
        }
      })
    }
  }
}