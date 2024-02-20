import { Injectable } from '@angular/core';
import { Lang } from '../models/lang';
import { enEN, esMX } from '../libs/langs';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  private browserLang: string = '';
  private lang: Lang = new Lang();
  constructor() { 
    this.browserLang = navigator.language;

    console.log(this.browserLang);
    if(this.browserLang == 'es-MX' || this.browserLang == 'es-ES' || this.browserLang == 'es-419') {
      this.lang = esMX;
    } else {
      this.lang = enEN;
    }
  }

  getLang(): Lang {
    return this.lang;
  }
}
