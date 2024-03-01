import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDataService } from 'src/app/services/login-data.service';
import { ActivityDataService } from '../../services/activity-data.service';
import { ActivityData } from 'src/app/models/ativities';
import { Modal } from 'bootstrap';
import { error } from 'console';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.css']
})
export class ActivitiesListComponent {

  public userRol: number | undefined = undefined;
  public activities: ActivityData[] = [];
  constructor(private activityService: ActivityDataService, private loginService: LoginDataService, private router: Router) {
    this.userRol = this.loginService.rol;
  }

  ngOnInit(): void {
    const url = this.router.url.split('/')
    let status: string = 'all';
    switch (url[3]) {
      case 'unassigned':
        status = '1';
        break;
      case 'inprogress':
        status = '2';
        break;
      case 'completed':
        status = '3';
        break;
      case 'pause':
        status = '4';
        break;
      default:
        status = 'all';
        break;
    }
    const loadScreenModal = new Modal(document.getElementById('loadScreen') as Element);
    loadScreenModal.show(document.body);
    this.activityService.getListActivities(url[2], status).subscribe((data: Array<ActivityData>)=> {
      this.activities = data;
    }, null, () => {
      loadScreenModal.hide();
    })
  }
}
