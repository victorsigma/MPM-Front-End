import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivityData } from '../../models/ativities';
import { ActivityDataService } from 'src/app/services/activity-data.service';
import { EditorActivityComponent } from '../editor-activity/editor-activity.component';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.css']
})
export class ActivityItemComponent implements OnInit {

  data = new ActivityData();

  @Input() activity:ActivityData = new ActivityData();
  constructor(private dataServiceModal: ActivityDataService) { }

  ngOnInit(): void {
  }

  onModalData(): void {
    this.dataServiceModal.activity = this.activity;
    this.data = this.dataServiceModal.activity;
    console.log(this.dataServiceModal.activity);
  }
}
