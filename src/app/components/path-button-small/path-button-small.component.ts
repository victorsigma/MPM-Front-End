import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { replacePaths } from 'src/app/libs/paths';
import { LoginDataService } from 'src/app/services/login-data.service';

@Component({
  selector: 'app-path-button-small',
  templateUrl: './path-button-small.component.html',
  styleUrls: ['./path-button-small.component.css']
})
export class PathButtonSmallComponent {
  @Input() item: any;
  @Input() slideStyle: boolean = false

  public isLogin: boolean = false;
  public patherPath: string = '';

  constructor(private loginService: LoginDataService, private router: Router) {
    this.isLogin = this.loginService.isLogin();
  }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.patherPath = replacePaths(this.router.url);
    })
  }
}
