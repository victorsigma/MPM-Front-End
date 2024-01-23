import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token: string = localStorage.getItem('token') || '';
    
    let request = req;

    if (token != '') {
      request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${ token }`
        }
      })
    }

    return next.handle(request);
  }
}
