import { Component } from '@angular/core';
import { Lang } from 'src/app/models/lang';
import { LangService } from 'src/app/services/lang.service';

@Component({
  selector: 'app-load-screen',
  templateUrl: './load-screen.component.html',
  styleUrls: ['./load-screen.component.css']
})
export class LoadScreenComponent {

  public lang: Lang = new Lang();
  constructor(private langService: LangService) {
    this.lang = this.langService.getLang();
  }
}
