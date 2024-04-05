import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { verify } from 'crypto';
import { Lang } from 'src/app/models/lang';
import { LangService } from 'src/app/services/lang.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent {

  public lang: Lang = new Lang();
  public verifyStatus: 'error' | 'completed' | 'inprocess' = 'inprocess';
  public isMobile: boolean = false;
  public show: boolean = false;
  constructor(private langService: LangService, private titleService: Title, private breakpointObserver: BreakpointObserver, private route: ActivatedRoute, private securityService: SecurityService) {
    this.titleService.setTitle(`MPM - Verify Account`);
    this.lang = this.langService.getLang();
    this.breakpointObserver.observe('(max-width: 992px)')
    .subscribe(result => {
      this.isMobile = result.matches;
    });
  }


  ngOnInit(): void {
    // Obtener el token de verificación de los parámetros de la ruta
    this.route.params.subscribe(params => {
      const token = params['token'];
      this.securityService.verifyAccountValidation(token).subscribe({
        next: (data) => {
          this.verifyStatus = 'completed';
          if(!this.isMobile) {
            setTimeout(() => {
              this.show = true;
            }, 100);
          } else {
            this.show = true;
          }
        },
        complete: () => {
        },
        error: (error) => {
          this.verifyStatus = 'error';
          if(!this.isMobile) {
            setTimeout(() => {
              this.show = true;
            }, 100);
          } else {
            this.show = true;
          }
        }
      })
    });
  }
}
