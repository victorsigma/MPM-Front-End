import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {v4 as uuidv4} from 'uuid';
import { ActivityData } from '../../models/ativities';
import { ProjectData } from 'src/app/models/projects';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {

  form: UntypedFormGroup;
  activity: ActivityData = new ActivityData();
  @Output() newActivity: EventEmitter<ActivityData> = new EventEmitter();
  @Input() project:ProjectData = new ProjectData();

  constructor(private toastr: ToastrService) {
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

  ngOnInit(): void {
  }

  addActivity(): void {
    this.activity = {
      id: uuidv4()/*this.activityId.activity*/,
      title: this.form.get('title')?.value,
      subtitle: this.form.get('subtitle')?.value,
      src: 'img_'+this.random(1, 7),
      status: this.form.get('status')?.value,
      dateEnd: new Date(new Date(this.form.get('dateEnd')?.value)),
      leader: true,
      analyst: this.form.get('rolesListAnalyst')?.value,
      designer: this.form.get('rolesListDesigner')?.value,
      programmer: this.form.get('rolesListProgrammer')?.value,
      projectId: this.project.id
    }

    this.newActivity.emit(this.activity);
    this.reloadForm();
  }

  addCancel() {
    this.toastr.error('Activity addition cancelled.', 'Operation Canceled');
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