import { Injectable } from '@angular/core';
import { ProjectData } from '../models/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectListService {


  projects:ProjectData[] = [
    {
      'id': '490602c6-a115-44ec-9bfb-d1d9b9f476d9',
      'title': 'Project MPM',
      'subtitle': 'Proyecto de Intregradora I',
      'src': 'img_6',
      'dateStart': new Date("06/26/2022"),
      'dateEnd':new Date("07/20/2022")
    },
    {
      'id': 'd648cf18-5145-48e8-bec9-891f346136cc',
      'title': 'Project 2',
      'subtitle': 'Proyecto de Prueba',
      'src': 'img_3',
      'dateStart': new Date("06/10/2022"),
      'dateEnd':new Date("07/30/2022")
    }
  ]
  constructor() { }
}
