import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivityData } from '../../models/ativities';
import { ActivityDataService } from '../../services/activity-data.service';
import { ActivityListService } from 'src/app/services/activity-list.service';
import { RolesListActivity } from 'src/app/models/roles';
import { UpdateDataService } from 'src/app/services/update-data.service';

@Component({
  selector: 'app-editor-activity',
  templateUrl: './editor-activity.component.html',
  styleUrls: ['./editor-activity.component.css']
})


export class EditorActivityComponent implements OnInit {

  @Output() deletActivity: EventEmitter<number> = new EventEmitter();

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
    private dataActivities: ActivityDataService, 
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
    if (this.form.get('title')?.value != null) {
      this.activityList.activities[this.activityList.activities.indexOf(this.dataServiceModal.activity)].title = this.form.get('title')?.value;
    }

    if (this.form.get('subtitle')?.value != null) {
      this.activityList.activities[this.activityList.activities.indexOf(this.dataServiceModal.activity)].subtitle = this.form.get('subtitle')?.value;
    }

    if (this.form.get('status')?.value != 0) {
      this.activityList.activities[this.activityList.activities.indexOf(this.dataServiceModal.activity)].status = this.form.get('status')?.value;
    }

    this.activityList.activities[this.activityList.activities.indexOf( this.dataServiceModal.activity )].rolesList = new RolesListActivity(
      true,
        this.form.get('rolesListAnalyst')?.value,
        this.form.get('rolesListDesigner')?.value,
        this.form.get('rolesListProgrammer')?.value
    )

    if (this.form.get('dateEnd')?.value != null) {
      this.activityList.activities[this.activityList.activities.indexOf(this.dataServiceModal.activity)].dateEnd = new Date(new Date(this.form.get('dateEnd')?.value).setDate(new Date(this.form.get('dateEnd')?.value).getDate() + 1));
    }

    this.activityList.reloadActivities();
    this.reloadForm();
  }

  removeActivity() {
    var index = this.dataActivities.activities.indexOf(this.dataServiceModal.activity);
    this.deletActivity.emit(index);
  }

  reloadForm() {
    this.form = new FormGroup({
      title: new FormControl(),
      subtitle: new FormControl(),
      status: new FormControl(this.dataServiceModal.activity.status),
      dateEnd: new FormControl(),
      rolesListAnalyst: new FormControl(this.dataServiceModal.activity.rolesList.Analyst),
      rolesListDesigner: new FormControl(this.dataServiceModal.activity.rolesList.Designer),
      rolesListProgrammer: new FormControl(this.dataServiceModal.activity.rolesList.Programmer)
    })
  }
}