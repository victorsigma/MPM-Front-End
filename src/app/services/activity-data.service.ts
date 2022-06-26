import { Injectable } from '@angular/core';
import { ActivityData } from '../models/ativities';

@Injectable({
  providedIn: 'root'
})
export class ActivityDataService {

  activity:ActivityData = new ActivityData();

  activities:ActivityData[] = [];

  constructor() { }
}
