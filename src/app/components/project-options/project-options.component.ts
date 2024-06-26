import { Component, Input, OnInit } from '@angular/core';
import { ProjectData } from 'src/app/models/projects';
import { FormGroup, FormControl } from '@angular/forms';
import { ProjectListService } from '../../services/project-list.service';
import { LangService } from 'src/app/services/lang.service';
import { Lang } from 'src/app/models/lang';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project-options',
  templateUrl: './project-options.component.html',
  styleUrls: ['./project-options.component.css']
})
export class ProjectOptionsComponent implements OnInit {

  @Input() project: ProjectData = new ProjectData();

  form: FormGroup = new FormGroup({
    title: new FormControl(),
    subtitle: new FormControl(),
    dateEnd: new FormControl(),
  });

  public isCustom: boolean = false;

  public lang: Lang = new Lang();

  constructor(private projectList: ProjectListService, private langService: LangService, private toastr: ToastrService) {
    this.updateForm();
    this.lang = this.langService.getLang();
  }

  ngOnInit(): void {
  }

  updateProject() {
    if (this.form.get('title')?.value != null) {
      //this.projectList.projects[this.projectList.projects.indexOf(this.project)].title = this.form.get('title')?.value;
      this.project.title = this.form.get('title')?.value;
    }

    if (this.form.get('subtitle')?.value != null) {
      //this.projectList.projects[this.projectList.projects.indexOf(this.project)].subtitle = this.form.get('subtitle')?.value;
      this.project.subtitle = this.form.get('subtitle')?.value;
    }

    if (this.form.get('dateEnd')?.value != null) {
      //this.projectList.projects[this.projectList.projects.indexOf(this.project)].dateEnd = new Date(new Date(this.form.get('dateEnd')?.value).setDate(new Date(this.form.get('dateEnd')?.value).getDate() + 1));
      this.project.dateEnd = new Date(new Date(this.form.get('dateEnd')?.value));
    }

    console.log(this.project)

    this.projectList.updateProjects(this.project.id, this.project).subscribe({
      next: (data) => {
        this.toastr.success(this.lang.toast.update_ok, this.lang.toast.status_complited)
      },
      complete: () => {
        location.reload();
      },
      error: () => {
        this.toastr.error(this.lang.toast.update_error, this.lang.toast.status_cancel)
      }
    })
  }

  updateForm() {
    this.form = new FormGroup({
      title: new FormControl(),
      subtitle: new FormControl(),
      dateEnd: new FormControl(),
    });
  }
}
