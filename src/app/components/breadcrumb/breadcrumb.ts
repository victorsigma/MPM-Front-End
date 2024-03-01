import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivationEnd, Router } from '@angular/router';
import { map, filter } from 'rxjs';
import { LangService } from 'src/app/services/lang.service';
import { Lang } from 'src/app/models/lang';
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumb.html',
  styleUrls: ['./breadcrumb.css']
})
export class BreadcrumbcrumbComponent {
  public title?: string;
  public parent?: any = undefined;
  public gfather?: any = undefined;
  public ggfather?: any = undefined;
  public tituloSubs$: Subscription;
  public lang: Lang = new Lang();

  constructor(private router: Router, private langService: LangService) { 
    this.lang = this.langService.getLang();
    this.tituloSubs$ = this.getArgumentos().subscribe(({title, parent, gfather, ggfather})=> {
      this.title = title;
      this.parent = parent;
      this.gfather = gfather;
      this.ggfather = ggfather;
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
  removeLastSegment(): string {
    const path = this.router.url;
    // Busca la última aparición de "/" en la ruta
    const lastIndex = path.lastIndexOf('/');
    // Si la última aparición de "/" no es el último carácter en la ruta,
    // devuelve la subcadena de la ruta desde el inicio hasta el índice de la última "/"
    if (lastIndex !== path.length - 1) {
      return path.slice(0, lastIndex);
    } else {
      // Si la última "/" es el último carácter en la ruta, devuelve la ruta sin cambios
      return path;
    }
  }

  removeLastsSegment(): string {
    const path = this.router.url;
    // Busca la penúltima aparición de "/"
    const lastIndex = path.lastIndexOf('/');
    const secondLastIndex = path.lastIndexOf('/', lastIndex - 1);
    // Si la penúltima aparición de "/" no es el último carácter en la ruta,
    // devuelve la subcadena de la ruta desde el inicio hasta el índice de la penúltima "/"
    if (secondLastIndex !== -1) {
      return path.slice(0, secondLastIndex);
    } else {
      // Si no se encuentra la penúltima "/", devuelve la ruta sin cambios
      return path;
    }
  }
}
