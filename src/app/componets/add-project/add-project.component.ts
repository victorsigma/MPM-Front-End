import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {v4 as uuidv4} from 'uuid';
import { ProjectData } from '../../models/projects';
import { ProjectDataService } from '../../services/project-data.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  form: FormGroup;
  project: ProjectData = new ProjectData();

  @Output() newProject: EventEmitter<ProjectData> = new EventEmitter();
  constructor(public projectId: ProjectDataService) {
    this.form = new FormGroup(
      {
        title: new FormControl(),
        subtitle: new FormControl(),
        dateEnd: new FormControl()
      }
    );
  }

  ngOnInit(): void {
  }

  createProject(): void {
    this.project = {
      id: uuidv4(),
      title: this.form.get('title')?.value,
      subtitle: this.form.get('subtitle')?.value,
      src: 'img_'+this.random(1, 7),
      dateStart: new Date(),
      dateEnd: new Date(new Date(this.form.get('dateEnd')?.value).setDate(new Date(this.form.get('dateEnd')?.value).getDate()+1))
    };

    this.newProject.emit(this.project);
    console.log(this.project);
    this.reloadForm();
  }

  random(min: number, max: number) {
    return Math.round(Math.floor(Math.random() * (max - min + 1) + min))
  }

  reloadForm() {
    this.form = new FormGroup(
      {
        title: new FormControl(),
        subtitle: new FormControl(),
        dateEnd: new FormControl()
      }
    );
  }
}