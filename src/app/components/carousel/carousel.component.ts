import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {

  
  public imageSelector: number = 1;

  beforeImage() {
    if(this.imageSelector != 5) {
      this.imageSelector++;
    } else {
      this.imageSelector = 1;
    }
  }

  afterImage() {
    if(this.imageSelector != 1) {
      this.imageSelector--;
    } else {
      this.imageSelector = 5;
    }
  }
}
