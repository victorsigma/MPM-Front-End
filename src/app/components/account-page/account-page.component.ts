import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ToastrService } from 'ngx-toastr';
import { LoginDataService } from '../../services/login-data.service';
import { Title } from '@angular/platform-browser';
import { LangService } from 'src/app/services/lang.service';
import { Lang } from 'src/app/models/lang';


@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {

  public isMobile: boolean = false;

  public isAriaExpanded: boolean = false;

  public lang: Lang = new Lang()
  constructor(public loginService: LoginDataService, private toastr: ToastrService, private breakpointObserver: BreakpointObserver, private titleService: Title, private langService: LangService) {
    this.titleService.setTitle(`MPM - Account`)
    this.lang = this.langService.getLang()
    this.breakpointObserver.observe('(max-width: 992px)')
    .subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // Selecciona el elemento que deseas observar
    const targetElement: any = document.getElementById('nav-account');

    // Crea una instancia de MutationObserver y especifica una función de devolución de llamada
    const observer = new MutationObserver((mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'aria-expanded') {
          // La propiedad aria-expanded ha cambiado
          this.isAriaExpanded = targetElement.getAttribute('aria-expanded') == 'true' ? true : false;
        }
      }
    });

    // Configura las opciones para el observer (en este caso, observar cambios en atributos)
    const config = { attributes: true };

    // Inicia la observación del elemento de destino
    observer.observe(targetElement, config);
  }
}
