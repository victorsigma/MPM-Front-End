import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ActivityData } from '../../models/ativities';
import { ActivityDataService } from '../../services/activity-data.service';
import { ProjectData } from 'src/app/models/projects';
import { ProjectDataService } from 'src/app/services/project-data.service';
import { LoginDataService } from '../../services/login-data.service';
import { UpdateDataService } from '../../services/update-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { error } from 'console';

@Component({
  selector: 'app-activities-page',
  templateUrl: './activities-page.component.html',
  styleUrls: ['./activities-page.component.css']
})
export class ActivitiesPageComponent implements OnInit {
  project: ProjectData | undefined = undefined;

  public update: Subject<void> = new Subject<void>();
  loginRol: number | undefined = undefined;

  activitiesMaster: ActivityData[] = []

  activities: ActivityData[] = [];
  activitiesUn: ActivityData[] = [];
  activitiesIn: ActivityData[] = [];
  activitiesCm: ActivityData[] = [];

  constructor(
    private toastr: ToastrService,
    private dataActivities: ActivityDataService,
    public projectData: ProjectDataService,
    public activityData: ActivityDataService,
    public loginService: LoginDataService,
    private emitter: UpdateDataService,
    private members: UpdateDataService,
    private activeRoute: ActivatedRoute,
    private titleService: Title,
    private router:Router
  ) {
    const { idProject }= this.activeRoute.snapshot.params

    this.projectData.getProjectById(idProject).subscribe((data: any) => {
      this.project = data.project as ProjectData;
      this.loginRol = data.rol.idRol;
      this.titleService.setTitle(`MPM - ${this.project.title}`)
      console.log(data)
    }, error => {
      console.log(error)
      this.router.navigate(['/'])
    })
  }

  ngOnInit(): void {
  }

  newActivity(activity: ActivityData) {

    // this.activityList.addActivity(activity).subscribe(data => {
    //   this.filterRol();
    //   this.toastr.info(activity.subtitle, 'Add ' + activity.title);
    // })
  }

  deletActivity(id: string) {
    // this.activityList.removeActivity(id).subscribe(data => {
    //   this.filterRol();
    //   this.toastr.error('The activity was eliminated.', 'Remove Activity');
    // })
  }

  updateActivity(activity: ActivityData) {
    // this.activityList.updateActivity(activity.id, activity).subscribe(data => {
    //   this.filterRol();
    // })
  }

  filterRol() {
    // this.activityList.getListActivities().subscribe(data => {
    //   this.activityList.activitiesMaster = data;
    //   this.dataActivities.activities = this.activityList.activitiesMaster;
    //   this.activityList.filterRol();
    // })
  }

  updateData() {
    this.emitter.emitirEvento();
  }

  updateMembers() {
    this.members.emitirEvento();
  }
}