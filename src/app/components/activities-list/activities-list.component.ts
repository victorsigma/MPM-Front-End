import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDataService } from 'src/app/services/login-data.service';
import { ActivityDataService } from '../../services/activity-data.service';
import { ActivityData } from 'src/app/models/ativities';
import { Modal } from 'bootstrap';
import { error } from 'console';
import { Lang } from 'src/app/models/lang';
import { LangService } from 'src/app/services/lang.service';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.css']
})
export class ActivitiesListComponent {

  public userRol: number | undefined = undefined;
  public searchTerm: string = '';
  public activities: ActivityData[] = [];
  public lang: Lang = new Lang();
  constructor(private activityService: ActivityDataService, private loginService: LoginDataService, private router: Router, private langService: LangService) {
    this.userRol = this.loginService.rol;
    this.lang = this.langService.getLang();
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
    this.activityService.getListActivities(url[2], status).subscribe({
      next: (data: Array<ActivityData>)=> {
        this.activities = data;
      },
      complete: () => {
        loadScreenModal.hide();
      },
      error: () => {
        loadScreenModal.hide();
      }
    })
  }

  get filteredActivities(): ActivityData[] {
    return this.activities.filter(activities =>
      activities.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      activities.subtitle.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
