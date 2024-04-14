import { Injectable } from '@angular/core';
import { Observable, Subject, fromEvent, merge, timer, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LoginDataService } from './login-data.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  private inactivityTime = (30*60*1000);
  private activityEvents$: Observable<any>;
  private activityTimer$: Observable<any> | undefined = undefined;
  private activitySubscription: Subscription | undefined = undefined;
  private inModal: boolean = false;

  private inactivitySubject = new Subject<void>();

  constructor(private loginService: LoginDataService) {
    this.activityEvents$ = merge(
      fromEvent(document, 'mousemove'),
      fromEvent(document, 'wheel'),
      fromEvent(document, 'click'),
      fromEvent(document, 'keypress')
    );

    if(this.loginService.isLogin()) this.initInactivityDetection();
  }

  private initInactivityDetection(): void {
    let lastActivityTime = new Date().getTime();

    this.activityEvents$.subscribe(() => {
      lastActivityTime = new Date().getTime();
      this.resetTimer(lastActivityTime);
    });

    this.resetTimer(lastActivityTime);
  }

  private resetTimer(lastActivityTime: number): void {
    if (this.activitySubscription) {
      this.activitySubscription.unsubscribe();
    }

    this.activityTimer$ = timer(this.inactivityTime - (new Date().getTime() - lastActivityTime));

    this.activitySubscription = this.activityTimer$.subscribe(() => {
      if (!this.inModal) {
        this.inactivitySubject.next();
      }
    });
  }

  getInactivityEvent(): Observable<void> {
    return this.inactivitySubject.asObservable();
  }

  setInModal(value: boolean): void {
    this.inModal = value;
    if (!value && this.activityTimer$) {
      this.resetTimer(new Date().getTime());
    }
  }
}