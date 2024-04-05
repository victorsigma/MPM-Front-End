import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectUserData } from 'src/app/models/projectsHasUser';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ProjectDataService } from 'src/app/services/project-data.service';
import unMatchFieldsValidator from 'src/app/validators/unMatchRoleValidators';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LangService } from 'src/app/services/lang.service';
import { Lang } from 'src/app/models/lang';
import { ToastrService } from 'ngx-toastr';

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

  public form: UntypedFormGroup = new UntypedFormGroup({
    userRole: new UntypedFormControl(0, [unMatchFieldsValidator(this.actualRole)])
  });

  public lang: Lang = new Lang();
  constructor(private projectData: ProjectDataService, private activeRoute: ActivatedRoute, private langService: LangService, private toastr: ToastrService) {
    this.lang = this.langService.getLang();
  }

  ngOnInit(): void {
    switch (this.member.rolName) {
      case 'Analyst':
        this.actualRole = 1;
        this.form = new UntypedFormGroup({
          userRole: new UntypedFormControl(1, [unMatchFieldsValidator(this.actualRole)])
        });
        break;
      case 'Designer':
        this.actualRole = 1;
        this.form = new UntypedFormGroup({
          userRole: new UntypedFormControl(2, [unMatchFieldsValidator(this.actualRole)])
        });
        break;
      case 'Programmer':
        this.actualRole = 1;
        this.form = new UntypedFormGroup({
          userRole: new UntypedFormControl(3, [unMatchFieldsValidator(this.actualRole)])
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
    if (this.actualRole != this.form.get('userRole')?.value) {

    }
  }
}