import { Injectable } from '@angular/core';
import { ProjectData } from '../models/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {

  project:ProjectData = new ProjectData();
  constructor() { }
}