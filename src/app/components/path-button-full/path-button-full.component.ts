import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { replacePaths } from 'src/app/app-routing.module';
import { LoginDataService } from 'src/app/services/login-data.service';

@Component({
  selector: 'app-path-button-full',
  templateUrl: './path-button-full.component.html',
  styleUrls: ['./path-button-full.component.css']
})
export class PathButtonFullComponent {
  @Input() item: any;
  @Input() slideStyle: boolean = false

  public isLogin: boolean = false;
  public patherPath: string = '';

  constructor(private loginService: LoginDataService, private router: Router, private cdr: ChangeDetectorRef) {
    this.isLogin = this.loginService.isLogin();
  }

  ngOnInit(): void {
    this.patherPath = replacePaths(this.router.url);
  }
}
