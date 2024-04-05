import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivityDataService } from '../../services/activity-data.service';
import { UpdateDataService } from 'src/app/services/update-data.service';
import { ActivityData, ActivityDataPost } from '../../models/ativities';
import { LangService } from 'src/app/services/lang.service';
import { Lang } from 'src/app/models/lang';

@Component({
  selector: 'app-editor-activity',
  templateUrl: './editor-activity.component.html',
  styleUrls: ['./editor-activity.component.css']
})


export class EditorActivityComponent implements OnInit {

  @Input() public activity: ActivityData = new ActivityData();

  form: FormGroup = new FormGroup({
    title: new FormControl(),
    subtitle: new FormControl(),
    status: new FormControl(),
    dateEnd: new FormControl(),
    rolesListAnalyst: new FormControl(),
    rolesListDesigner: new FormControl(),
    rolesListProgrammer: new FormControl()
  })

  public lang: Lang = new Lang();
  constructor(
    public dataServiceModal: ActivityDataService,
    public activityData: ActivityDataService,
    private emitter: UpdateDataService,
    private langService: LangService
  ) {
    this.lang = this.langService.getLang();
    this.emitter.emitter.subscribe(() => {
      this.reloadForm()
    });
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(),
      subtitle: new FormControl(),
      status: new FormControl(),
      dateEnd: new FormControl(),
      rolesListAnalyst: new FormControl(this.activity.analyst.data[0]),
      rolesListDesigner: new FormControl(this.activity.designer.data[0]),
      rolesListProgrammer: new FormControl(this.activity.programmer.data[0])
    })
  }

  editActivity() {
    const putActivity = new ActivityDataPost()
    putActivity.title = this.activity.title;
    putActivity.subtitle = this.activity.subtitle;
    putActivity.status = this.activity.status;
    putActivity.analyst = this.activity.analyst.data[0];
    putActivity.designer = this.activity.designer.data[0];
    putActivity.programmer = this.activity.programmer.data[0];
    putActivity.dateEnd = new Date(new Date(this.activity.dateEnd));;
    putActivity.src = this.activity.src;

    console.log(this.form?.value)

    if (this.form.get('title')?.value != null) {
      putActivity.title = this.form.get('title')?.value;
    }

    if (this.form.get('subtitle')?.value != null) {
      putActivity.subtitle = this.form.get('subtitle')?.value;
    }

    if (this.form.get('status')?.value != null) {
      putActivity.status = this.form.get('status')?.value;
    }

    putActivity.analyst = this.form.get('rolesListAnalyst')?.value ? true : false;

    putActivity.designer = this.form.get('rolesListDesigner')?.value ? true : false;

    putActivity.programmer = this.form.get('rolesListProgrammer')?.value ? true : false;

    if (this.form.get('dateEnd')?.value != null) {
      putActivity.dateEnd = new Date(new Date(this.form.get('dateEnd')?.value));
    }

    this.activityData.updateActivity(this.activity.id, putActivity).subscribe({
      next: (data) => {
        console.log(data);
      },
      complete: () => {
        location.reload();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  removeActivity() {
    this.activityData.removeActivity(this.activity.id).subscribe({
      next: (data) => {
        console.log(data);
      },
      complete: () => {
        location.reload();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  reloadForm() {
    // this.form = new FormGroup({
    //   title: new FormControl(),
    //   subtitle: new FormControl(),
    //   status: new FormControl(this.dataServiceModal.activity.status),
    //   dateEnd: new FormControl(),
    //   rolesListAnalyst: new FormControl(this.dataServiceModal.activity.analyst),
    //   rolesListDesigner: new FormControl(this.dataServiceModal.activity.designer),
    //   rolesListProgrammer: new FormControl(this.dataServiceModal.activity.programmer)
    // })
  }
}