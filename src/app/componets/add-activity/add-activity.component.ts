import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {v4 as uuidv4} from 'uuid';
import { LsActivityService } from 'src/app/services/ls-activity.service';
import { RolesListActivity } from '../../models/roles';
import { ActivityData } from '../../models/ativities';
import { ProjectData } from 'src/app/models/projects';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {

  form: FormGroup;
  activity: ActivityData = new ActivityData();
  @Output() newActivity: EventEmitter<ActivityData> = new EventEmitter();
  @Input() project:ProjectData = new ProjectData();

  constructor(private toastr: ToastrService) {
    this.form = new FormGroup(
      {
        title: new FormControl(),
        subtitle: new FormControl(),
        status: new FormControl(1),
        dateEnd: new FormControl(),
        rolesListAnalyst: new FormControl(false),
        rolesListDesigner: new FormControl(false),
        rolesListProgrammer: new FormControl(false)
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
      dateEnd: new Date(this.form.get('dateEnd')?.value),
      rolesList: new RolesListActivity(
        true,
        this.form.get('rolesListAnalyst')?.value,
        this.form.get('rolesListDesigner')?.value,
        this.form.get('rolesListProgrammer')?.value
      ),
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
    this.form = new FormGroup(
      {
        title: new FormControl(),
        subtitle: new FormControl(),
        status: new FormControl(1),
        dateEnd: new FormControl(),
        rolesListAnalyst: new FormControl(false),
        rolesListDesigner: new FormControl(false),
        rolesListProgrammer: new FormControl(false)
      }
    );
  }
}

/*
title: ['', [Validators.required, Validators.maxLength(30)]],
subtitle: ['', [Validators.required, Validators.maxLength(150)]],
status: [''],
dateEnd: ['', [Validators.required, Validators.maxLength(10)]],
rolesList: [new RolesListActivity(true, false, false, false)]
*/