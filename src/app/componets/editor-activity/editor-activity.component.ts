import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivityDataService } from '../../services/activity-data.service';
import { ActivityListService } from 'src/app/services/activity-list.service';
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


  activity: ActivityData = new ActivityData();
  form: FormGroup = new FormGroup({
    title: new FormControl(),
    subtitle: new FormControl(),
    status: new FormControl(),
    dateEnd: new FormControl(),
    rolesListAnalyst: new FormControl(),
    rolesListDesigner: new FormControl(),
    rolesListProgrammer: new FormControl()
  })
  constructor(
    public dataServiceModal: ActivityDataService, 
    public activityList: ActivityListService,
    private emitter: UpdateDataService
  )
    {
    this.emitter.emitter.subscribe(() => {
      this.reloadForm()
    });
  }

  ngOnInit(): void {

  }

  editActivity() {
    this.activity = this.dataServiceModal.activity;

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

    this.activityList.filterRol();
    this.updateActivity.emit(this.activity);
    this.reloadForm();
  }

  removeActivity() {
    this.deletActivity.emit(this.dataServiceModal.activity.id);
  }

  reloadForm() {
    this.form = new FormGroup({
      title: new FormControl(),
      subtitle: new FormControl(),
      status: new FormControl(this.dataServiceModal.activity.status),
      dateEnd: new FormControl(),
      rolesListAnalyst: new FormControl(this.dataServiceModal.activity.analyst),
      rolesListDesigner: new FormControl(this.dataServiceModal.activity.designer),
      rolesListProgrammer: new FormControl(this.dataServiceModal.activity.programmer)
    })
  }
}