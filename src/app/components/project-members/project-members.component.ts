import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { ProjectData } from 'src/app/models/projects';
import { PostProjectsHasUser, ProjectUserData, ProjectsHasUser } from '../../models/projectsHasUser';
import { ProjectDataService } from 'src/app/services/project-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginDataService } from 'src/app/services/login-data.service';
import { Title } from '@angular/platform-browser';
import { error } from 'console';
import { LangService } from 'src/app/services/lang.service';
import { Lang } from 'src/app/models/lang';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-project-members',
  templateUrl: './project-members.component.html',
  styleUrls: ['./project-members.component.css']
})
export class ProjectMembersComponent implements OnInit {
  private idProject: string = ''

  project: ProjectData | undefined = undefined;
  
  public active: number = 0;
  public lang: Lang = new Lang();
  public isMobile: boolean = false;
  constructor(
    public projectData: ProjectDataService,
    public loginService: LoginDataService,
    private activeRoute: ActivatedRoute,
    private titleService: Title,
    private langServive: LangService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
    ) {
    const { idProject } = this.activeRoute.snapshot.params
    this.lang = this.langServive.getLang();
    this.breakpointObserver.observe('(max-width: 992px)')
    .subscribe(result => {
      this.isMobile = result.matches;
    });

    this.projectData.getProjectById(idProject).subscribe({
      next: (data: any) => {
        this.project = data.project as ProjectData;
        loginService.rol = data.rol.idRol;
        if(data.rol.idRol != 0) {
          this.router.navigate(['project', idProject, 'error'], {queryParams: { status: 404}});
        }
        this.titleService.setTitle(`MPM - ${this.project.title}`)
      },
      error: (error) => {
        console.log(error)
        this.router.navigate(['project', idProject, 'error'], {queryParams: { status: error.status}});
      }
    })
  }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.active =this.router.url.includes('add') ? 1 : 0;
    })
  }
}