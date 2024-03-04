import { Component, ElementRef, ViewChild } from '@angular/core';
import { Lang } from 'src/app/models/lang';
import { LangService } from 'src/app/services/lang.service';

@Component({
  selector: 'app-load-screen',
  templateUrl: './load-screen.component.html',
  styleUrls: ['./load-screen.component.css']
})
export class LoadScreenComponent {

  public lang: Lang = new Lang();

  @ViewChild('closeButton', { static: false }) private closeButtonRef !: ElementRef;
  constructor(private langService: LangService) {
    this.lang = this.langService.getLang();
  }

  public closeLoadScreen() {
    const closeButton: HTMLInputElement = this.closeButtonRef.nativeElement;
    closeButton.click();
  }
}
