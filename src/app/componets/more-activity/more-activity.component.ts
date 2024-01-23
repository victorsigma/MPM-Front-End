import { Component, OnInit } from '@angular/core';
import { ActivityDataService } from '../../services/activity-data.service';

@Component({
  selector: 'app-more-activity',
  templateUrl: './more-activity.component.html',
  styleUrls: ['./more-activity.component.css']
})
export class MoreActivityComponent implements OnInit {

  constructor(public dataServiceModal: ActivityDataService) { }

  ngOnInit(): void {
  }

}
