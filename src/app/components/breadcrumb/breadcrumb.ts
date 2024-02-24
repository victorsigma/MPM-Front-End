import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Breadcrumb } from 'src/app/services/breadcrumb.service';
import { BreadcrumbsService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumb.html',
  styleUrls: ['./breadcrumb.css']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  breadcrumbs: Breadcrumb[] = [];
  private subscriptions = new Subscription();

  constructor(private breadcrumbService: BreadcrumbsService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.breadcrumbService.breadcrumbs.subscribe(breadcrumb => {
        this.breadcrumbs = breadcrumb
        ;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
