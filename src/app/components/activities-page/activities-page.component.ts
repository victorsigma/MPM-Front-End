import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivityData } from '../../models/ativities';
import { ActivityDataService } from '../../services/activity-data.service';
import { ProjectData } from 'src/app/models/projects';
import { ProjectDataService } from 'src/app/services/project-data.service';
import { LoginDataService } from '../../services/login-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-activities-page',
  templateUrl: './activities-page.component.html',
  styleUrls: ['./activities-page.component.css']
})
export class ActivitiesPageComponent implements OnInit {
  project: ProjectData | undefined = undefined;
  userRol: number | undefined = undefined;
  activities: ActivityData[] = [];
  public idProject: string = '';

  constructor(
    public projectData: ProjectDataService,
    public activityData: ActivityDataService,
    public loginService: LoginDataService,
    private activeRoute: ActivatedRoute,
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const { idProject } = this.activeRoute.snapshot.params

    this.projectData.getProjectById(idProject).subscribe((data: any) => {
      this.project = data.project as ProjectData;
      this.userRol = data.rol.idRol;
      loginService.rol = data.rol.idRol;
      this.idProject = idProject;
      this.titleService.setTitle(`MPM - ${this.project.title}`)
    }, error => {
      this.router.navigate(['project', idProject, 'error'], {queryParams: { status: error.status}});
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

  goToParentRoute() {
    // Obtén el valor del parámetro idProject de la ruta actual
    const idProject = this.route.snapshot.paramMap.get('idProject');

    // Navega a la ruta padre manteniendo el parámetro idProject
    this.router.navigate(['project', idProject]);
  }

  goToMemberRoute() {
    const idProject = this.route.snapshot.paramMap.get('idProject');

    // Navega a la ruta padre manteniendo el parámetro idProject
    this.router.navigate(['project', idProject, 'members']);
  }
}