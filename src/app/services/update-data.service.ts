import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateDataService {

  emitter = new EventEmitter();

  emitirEvento() {
      this.emitter.emit();
  }   
  constructor() { }
}
