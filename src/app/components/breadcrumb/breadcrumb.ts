import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivationEnd, Router } from '@angular/router';
import { map, filter } from 'rxjs';
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumb.html',
  styleUrls: ['./breadcrumb.css']
})
export class BreadcrumbcrumbComponent {
  public titulo?: string
  public tituloSubs$: Subscription;

  constructor(private router: Router) { 
    this.tituloSubs$ = this.getArgumentos().subscribe(({titulo})=> {
      this.titulo = titulo;
      document.title = `AdminLte - ${titulo}`;
    })
  }

  ngOnInit(): void {

  }
  ngOnDetroy(): void {
    this.tituloSubs$?.unsubscribe();


  }

  getArgumentos() {
    return this.router.events.pipe(
      filter((event: any) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
}
