import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { ProjectData } from 'src/app/models/projects';
import { PostProjectsHasUser, ProjectUserData, ProjectsHasUser } from '../../models/projectsHasUser';
import { ProjectDataService } from 'src/app/services/project-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginDataService } from 'src/app/services/login-data.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-project-members',
  templateUrl: './project-members.component.html',
  styleUrls: ['./project-members.component.css']
})
export class ProjectMembersComponent implements OnInit {
  private idProject: string = ''

  project: ProjectData | undefined = undefined;
  
  public active: number = 0;
  constructor(
    public projectData: ProjectDataService,
    public loginService: LoginDataService,
    private activeRoute: ActivatedRoute,
    private titleService: Title,
    private router: Router
    ) {
    const { idProject } = this.activeRoute.snapshot.params

    this.projectData.getProjectById(idProject).subscribe((data: any) => {
      this.project = data.project as ProjectData;
      loginService.rol = data.rol.idRol;
      if(data.rol.idRol != 0) {
        this.router.navigate(['project', idProject, 'error'], {queryParams: { status: 404}});
      }
      this.titleService.setTitle(`MPM - ${this.project.title}`)
    }, error => {
      console.log(error)
      this.router.navigate(['project', idProject, 'error'], {queryParams: { status: error.status}});
    })
  }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.active =this.router.url.includes('add') ? 1 : 0;
    })
  }
}