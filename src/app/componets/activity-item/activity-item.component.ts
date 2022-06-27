import { Component, Input, OnInit } from '@angular/core';
import { ActivityData } from '../../models/ativities';
import { ActivityDataService } from 'src/app/services/activity-data.service';
import { ProjectData } from '../../models/projects';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.css']
})
export class ActivityItemComponent implements OnInit {

  data = new ActivityData();
  

  @Input() activity:ActivityData = new ActivityData();
  @Input() project:ProjectData = new ProjectData();
  constructor(private dataServiceModal: ActivityDataService) { 
  }

  ngOnInit(): void {
  }

  onModalData(): void {
    this.dataServiceModal.activity = this.activity;
    this.data = this.dataServiceModal.activity;
  }
}
