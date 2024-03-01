import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lang } from 'src/app/models/lang';
import { LangService } from 'src/app/services/lang.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent {
  public status: HttpStatusCode = 500
  public lang: Lang = new Lang();
  constructor(private route: ActivatedRoute, private langService: LangService) {
    this.lang = this.langService.getLang();
    this.route.queryParams.subscribe((params: any) => {
      this.status = params.status;
    })
  }
}
