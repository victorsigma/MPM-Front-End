import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivityData } from '../../models/ativities';
import { ActivityDataService } from '../../services/activity-data.service';
import { ProjectData } from 'src/app/models/projects';
import { ProjectDataService } from 'src/app/services/project-data.service';
import { LoginDataService } from '../../services/login-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Lang } from 'src/app/models/lang';
import { LangService } from 'src/app/services/lang.service';

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
  public isMobile: boolean = false;
  public lang: Lang = new Lang();

  constructor(
    public projectData: ProjectDataService,
    public activityData: ActivityDataService,
    public loginService: LoginDataService,
    private activeRoute: ActivatedRoute,
    private langServive: LangService,
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
  ) {
    this.lang = this.langServive.getLang();
    this.breakpointObserver.observe('(max-width: 992px)')
    .subscribe(result => {
      this.isMobile = result.matches;
    });

  }

  ngOnInit(): void {
    const { idProject } = this.activeRoute.snapshot.params
    this.projectData.getProjectById(idProject).subscribe((data: any) => {
      this.project = data.project as ProjectData || new ProjectData();
      this.userRol = data.rol.idRol;
      this.loginService.rol = data.rol.idRol;
      this.idProject = idProject;
      this.titleService.setTitle(`MPM - ${this.project.title}`)
    }, error => {
      this.router.navigate(['project', idProject, 'error'], {queryParams: { status: error.status}});
    })
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