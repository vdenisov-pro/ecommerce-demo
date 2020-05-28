/* tslint:disable */

import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { zip } from 'rxjs/observable/zip';
import { v4 as uuid } from 'uuid';
import 'rxjs/add/operator/first';
import { Injector } from '@angular/core';
import { FirebaseAuthServiceJS } from '../services/auth/firebase-auth/firebase-auth-js';
// import { FirebaseAuthService } from '../services/auth/firebase-auth/firebase-auth';

export class HttpHeadersInterceptor implements HttpInterceptor {
  private static readonly SESSION_ID: string = uuid();

  constructor(
    private injector: Injector,
  ) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<HttpEventType.Response>> {
    return this.getHeaders().mergeMap(headers => {
      const authReq = req.clone({
        setHeaders: headers
      });
      return next.handle(authReq);
    });
  }

  private getHeaders(): Observable<any> {
    const headers = {
      'CLIENT-SESSION-ID': HttpHeadersInterceptor.SESSION_ID,
      TIMEOFFSET: String(moment().utcOffset())
    };

    // const versionControl = this.injector.get(VersionControlService);
    // const observers = [ versionControl.localVersion.do((version) => {
    //    headers['CLIENT-VERSION'] = version;
    // })];

    const observers: any[] = [];
    const firebaseAuth = this.injector.get(FirebaseAuthServiceJS);
    const tokenRequired = firebaseAuth.isAuthenticated() || firebaseAuth.isLoginRequired();
    if (tokenRequired) {
      observers.push(firebaseAuth.getIdToken().do((token) => {
         headers['Authorization'] = `${token}`;
      }));
    }

    return zip(...observers)
      .first()
      .map(() => headers);
  }
}
