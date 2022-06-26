import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivityData } from '../../models/ativities';
import { ActivityDataService } from '../../services/activity-data.service';

@Component({
  selector: 'app-editor-activity',
  templateUrl: './editor-activity.component.html',
  styleUrls: ['./editor-activity.component.css']
})


export class EditorActivityComponent implements OnInit {

  @Output() deletActivity: EventEmitter<number> = new EventEmitter();
  constructor(public dataServiceModal: ActivityDataService, private dataActivities: ActivityDataService) { 
  }

  ngOnInit(): void {

  }

  removeActivity() {
    var index  = this.dataActivities.activities.indexOf( this.dataServiceModal.activity ); 
    this.deletActivity.emit(index);
  }
}