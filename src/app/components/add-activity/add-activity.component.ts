import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivityData, ActivityDataPost, activityStatusData } from '../../models/ativities';
import { ProjectData } from 'src/app/models/projects';
import { ActivityDataService } from '../../services/activity-data.service';
import { Router } from '@angular/router';

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
  statusType: Array<activityStatusData> = [];
  private url: string[] = []
  @Output() newActivity: EventEmitter<ActivityData> = new EventEmitter();
  @Input() project:ProjectData | undefined = new ProjectData();

  constructor(private toastr: ToastrService, private activityService: ActivityDataService, private router: Router) {
    this.url = this.router.url.split('/')
    this.activityService.getActivityStatusType().subscribe((data) => {
      this.statusType = data;
    })
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

    this.activityService.addActivity(this.activity).subscribe(() => {
      location.reload()
    })
  }

  addCancel() {
    //this.toastr.error('Activity addition cancelled.', 'Operation Canceled');
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