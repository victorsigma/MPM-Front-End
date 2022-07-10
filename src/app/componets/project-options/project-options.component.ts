import { Component, Input, OnInit } from '@angular/core';
import { ProjectData } from 'src/app/models/projects';
import { FormGroup, FormControl } from '@angular/forms';
import { ProjectListService } from '../../services/project-list.service';

@Component({
  selector: 'app-project-options',
  templateUrl: './project-options.component.html',
  styleUrls: ['./project-options.component.css']
})
export class ProjectOptionsComponent implements OnInit {

  @Input() project:ProjectData = new ProjectData();

  form: FormGroup = new FormGroup({
    title: new FormControl(),
    subtitle: new FormControl(),
    dateEnd: new FormControl(),
  });
  constructor(private projectList:ProjectListService) {
    this.updateForm();
  }

  ngOnInit(): void {
  }

  updateProject() {
    if (this.form.get('title')?.value != null) {
      this.projectList.projects[this.projectList.projects.indexOf(this.project)].title = this.form.get('title')?.value;
    }

    if (this.form.get('subtitle')?.value != null) {
      this.projectList.projects[this.projectList.projects.indexOf(this.project)].subtitle = this.form.get('subtitle')?.value;
    }

    if (this.form.get('dateEnd')?.value != null) {
      this.projectList.projects[this.projectList.projects.indexOf(this.project)].dateEnd = new Date(new Date(this.form.get('dateEnd')?.value).setDate(new Date(this.form.get('dateEnd')?.value).getDate() + 1));
    }

    this.updateForm();
  }

  updateForm() {
    this.form= new FormGroup({
      title: new FormControl(),
      subtitle: new FormControl(),
      dateEnd: new FormControl(),
    });
  }
}
