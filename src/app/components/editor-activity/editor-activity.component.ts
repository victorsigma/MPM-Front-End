import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { ActivityDataService } from '../../services/activity-data.service';
import { UpdateDataService } from 'src/app/services/update-data.service';
import { ActivityData } from '../../models/ativities';

@Component({
  selector: 'app-editor-activity',
  templateUrl: './editor-activity.component.html',
  styleUrls: ['./editor-activity.component.css']
})


export class EditorActivityComponent implements OnInit {

  @Output() deletActivity: EventEmitter<string> = new EventEmitter();
  @Output() updateActivity: EventEmitter<ActivityData> = new EventEmitter();


  public activity: ActivityData = new ActivityData();
  form: UntypedFormGroup = new UntypedFormGroup({
    title: new UntypedFormControl(),
    subtitle: new UntypedFormControl(),
    status: new UntypedFormControl(),
    dateEnd: new UntypedFormControl(),
    rolesListAnalyst: new UntypedFormControl(),
    rolesListDesigner: new UntypedFormControl(),
    rolesListProgrammer: new UntypedFormControl()
  })
  constructor(
    public dataServiceModal: ActivityDataService, 
    public activityData: ActivityDataService,
    private emitter: UpdateDataService
  )
    {
    this.emitter.emitter.subscribe(() => {
      this.reloadForm()
    });
  }

  ngOnInit(): void {
    this.activity = this.dataServiceModal.getModalActivity()
  }

  editActivity() {
    //this.activity = this.dataServiceModal.activity;

    if (this.form.get('title')?.value != null) {
      //this.activityList.activitiesMaster[this.activityList.activitiesMaster.indexOf(this.dataServiceModal.activity)].title = this.form.get('title')?.value;
      this.activity.title = this.form.get('title')?.value;
    }

    if (this.form.get('subtitle')?.value != null) {
      //this.activityList.activitiesMaster[this.activityList.activitiesMaster.indexOf(this.dataServiceModal.activity)].subtitle = this.form.get('subtitle')?.value;
      this.activity.subtitle = this.form.get('subtitle')?.value;
    }

    if (this.form.get('status')?.value != 0) {
      //this.activityList.activitiesMaster[this.activityList.activitiesMaster.indexOf(this.dataServiceModal.activity)].status = this.form.get('status')?.value;
      this.activity.status = this.form.get('status')?.value;
    }

    //this.activityList.activitiesMaster[this.activityList.activitiesMaster.indexOf( this.dataServiceModal.activity )].analyst =  this.form.get('rolesListAnalyst')?.value;
    this.activity.analyst = this.form.get('rolesListAnalyst')?.value;

    //this.activityList.activitiesMaster[this.activityList.activitiesMaster.indexOf( this.dataServiceModal.activity )].designer = this.form.get('rolesListDesigner')?.value;
    this.activity.designer = this.form.get('rolesListDesigner')?.value;

    //this.activityList.activitiesMaster[this.activityList.activitiesMaster.indexOf( this.dataServiceModal.activity )].programmer = this.form.get('rolesListProgrammer')?.value;
    this.activity.programmer = this.form.get('rolesListProgrammer')?.value;

    if (this.form.get('dateEnd')?.value != null) {
      //this.activityList.activitiesMaster[this.activityList.activitiesMaster.indexOf(this.dataServiceModal.activity)].dateEnd = new Date(new Date(this.form.get('dateEnd')?.value).setDate(new Date(this.form.get('dateEnd')?.value).getDate() + 1));
      this.activity.dateEnd = new Date(new Date(this.form.get('dateEnd')?.value));
    }

    this.updateActivity.emit(this.activity);
    this.reloadForm();
  }

  removeActivity() {
    //this.deletActivity.emit(this.dataServiceModal.activity.id);
  }

  reloadForm() {
    // this.form = new UntypedFormGroup({
    //   title: new UntypedFormControl(),
    //   subtitle: new UntypedFormControl(),
    //   status: new UntypedFormControl(this.dataServiceModal.activity.status),
    //   dateEnd: new UntypedFormControl(),
    //   rolesListAnalyst: new UntypedFormControl(this.dataServiceModal.activity.analyst),
    //   rolesListDesigner: new UntypedFormControl(this.dataServiceModal.activity.designer),
    //   rolesListProgrammer: new UntypedFormControl(this.dataServiceModal.activity.programmer)
    // })
  }
}