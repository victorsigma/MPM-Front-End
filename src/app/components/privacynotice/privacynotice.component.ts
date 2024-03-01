import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Lang } from 'src/app/models/lang';
import { LangService } from 'src/app/services/lang.service';

@Component({
  selector: 'app-privacynotice',
  templateUrl: './privacynotice.component.html',
  styleUrls: ['./privacynotice.component.css']
})
export class PrivacynoticeComponent {

  public lang: Lang = new Lang();
  constructor(private titleService: Title, private langService: LangService) {
    this.lang = this.langService.getLang();
    this.titleService.setTitle(`MPM - ${this.lang.pather_privacy}`)
  }
}
