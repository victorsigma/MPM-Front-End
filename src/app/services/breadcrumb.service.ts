import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface Breadcrumb {
  label: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {
  public breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const root = this.router.routerState.snapshot.root;
      const breadcrumbs: Breadcrumb[] = [];
      this.addBreadcrumb(root, [], breadcrumbs);
      this.breadcrumbs.next(breadcrumbs);
    });
  }

  private addBreadcrumb(route: ActivatedRouteSnapshot, parentUrl: string[], breadcrumbs: Breadcrumb[]) {
    if (route) {
      const path = route.url.map(urlSegment => urlSegment.path).join('/');
      if (path && route.data['breadcrumb']) {
        const breadcrumbLabel = route.data['breadcrumb'];
        const breadcrumbUrl = '/' + parentUrl.concat(path).join('/');
        const breadcrumb: Breadcrumb = { label: breadcrumbLabel, url: breadcrumbUrl };
        breadcrumbs.push(breadcrumb);
      }

      if (route.firstChild) {
        this.addBreadcrumb(route.firstChild, parentUrl.concat(path), breadcrumbs);
      }
    }
  }
}
