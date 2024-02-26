import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivityData } from '../../models/ativities';
import { ActivityDataService } from 'src/app/services/activity-data.service';
import { ProjectData } from '../../models/projects';
import { LoginDataService } from '../../services/login-data.service';
import { ProjectsHasUser } from '../../models/projectsHasUser';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.css']
})
export class ActivityItemComponent implements OnInit {

  data = new ActivityData();

  @Input() activity:ActivityData = new ActivityData();
  @Input() userRol: number | undefined = undefined;
  @Output() update:EventEmitter<null> = new EventEmitter<null>();
  constructor(private dataServiceModal: ActivityDataService, public loginService: LoginDataService) { 
  }

  ngOnInit(): void {
  }

  onModalData(): void {
    this.dataServiceModal.setModalActivity(this.activity);
    this.update.emit();
  }

  public isLeader() {
    return this.userRol == 0;
  }
}
