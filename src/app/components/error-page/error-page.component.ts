import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent {
  
  public status: HttpStatusCode = 500
  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params: any) => {
      this.status = params.status;
    })
  }
}
