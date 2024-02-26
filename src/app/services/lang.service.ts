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
    if(this.browserLang.includes('es')) {
      this.lang = esMX;
    } else {
      this.lang = enEN;
    }
  }

  getLang(): Lang {
    return this.lang;
  }
}
