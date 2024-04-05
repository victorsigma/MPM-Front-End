import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivityData, ActivityDataPost, activityStatusData } from '../../models/ativities';
import { ProjectData } from 'src/app/models/projects';
import { ActivityDataService } from '../../services/activity-data.service';
import { Router } from '@angular/router';
import { Lang } from 'src/app/models/lang';
import { LangService } from 'src/app/services/lang.service';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {

  form: UntypedFormGroup = new UntypedFormGroup(
    {
      title: new UntypedFormControl(),
      subtitle: new UntypedFormControl(),
      status: new UntypedFormControl(1),
      dateEnd: new UntypedFormControl(),
      rolesListAnalyst: new UntypedFormControl(false),
      rolesListDesigner: new UntypedFormControl(false),
      rolesListProgrammer: new UntypedFormControl(false)
    }
  );
  activity: ActivityDataPost = new ActivityDataPost();
  private url: string[] = []
  @Output() newActivity: EventEmitter<ActivityData> = new EventEmitter();
  @Input() project:ProjectData | undefined = new ProjectData();

  public lang: Lang = new Lang();
  constructor(private toastr: ToastrService, private activityService: ActivityDataService, private router: Router, private langService: LangService) {
    this.url = this.router.url.split('/')
    this.lang = this.langService.getLang();
  }

  ngOnInit(): void {
  }

  addActivity(): void {
    this.activity = {
      id: '',
      title: this.form.get('title')?.value,
      subtitle: this.form.get('subtitle')?.value,
      src: 'img_'+this.random(1, 7),
      status: this.form.get('status')?.value,
      dateEnd: new Date(new Date(this.form.get('dateEnd')?.value)),
      leader: true,
      analyst: this.form.get('rolesListAnalyst')?.value,
      designer: this.form.get('rolesListDesigner')?.value,
      programmer: this.form.get('rolesListProgrammer')?.value,
      projectId: this.url[2]
    }

    this.activityService.addActivity(this.activity).subscribe({
      complete: () => {
        this.toastr.success(this.lang.toast.activity_add_ok, this.lang.toast.status_complited);
        location.reload()
      },
      error: () => {
        this.toastr.success(this.lang.toast.activity_add_error, this.lang.toast.status_cancel);
      }
    })
  }

  addCancel() {
    this.reloadForm();
  }

  random(min: number, max: number) {
    return Math.round(Math.floor(Math.random() * (max - min + 1) + min))
  }

  reloadForm() {
    this.form = new UntypedFormGroup(
      {
        title: new UntypedFormControl(),
        subtitle: new UntypedFormControl(),
        status: new UntypedFormControl(1),
        dateEnd: new UntypedFormControl(),
        rolesListAnalyst: new UntypedFormControl(false),
        rolesListDesigner: new UntypedFormControl(false),
        rolesListProgrammer: new UntypedFormControl(false)
      }
    );
  }
}