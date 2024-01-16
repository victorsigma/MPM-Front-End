import { Component, Input, OnInit } from '@angular/core';
import { ProjectData } from 'src/app/models/projects';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { ProjectListService } from '../../services/project-list.service';

@Component({
  selector: 'app-project-options',
  templateUrl: './project-options.component.html',
  styleUrls: ['./project-options.component.css']
})
export class ProjectOptionsComponent implements OnInit {

  @Input() project:ProjectData = new ProjectData();

  form: UntypedFormGroup = new UntypedFormGroup({
    title: new UntypedFormControl(),
    subtitle: new UntypedFormControl(),
    dateEnd: new UntypedFormControl(),
  });
  constructor(private projectList:ProjectListService) {
    this.updateForm();
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

    this.projectList.updateProjects(this.project.id, this.project).subscribe(data => {
      this.projectList.getListProjects().subscribe(data => {
        this.projectList.projectsMaster = data;
        this.projectList.loadProjects();
      })
      this.updateForm();
    })
  }

  updateForm() {
    this.form= new UntypedFormGroup({
      title: new UntypedFormControl(),
      subtitle: new UntypedFormControl(),
      dateEnd: new UntypedFormControl(),
    });
  }
}
