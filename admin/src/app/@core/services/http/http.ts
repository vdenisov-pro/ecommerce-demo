/* tslint:disable */

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { zip } from 'rxjs';
import get from 'lodash-es/get';

import { FirebaseAuthService } from '../auth/firebase-auth/firebase-auth';
import * as moment from 'moment';
import { v4 as uuid } from 'uuid';
import { of } from 'rxjs/observable/of';

import { environment } from 'src/environments/environment';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { SentryService } from "../sentry/sentry.service";
import { FirebaseAuthServiceJS } from '../auth/firebase-auth/firebase-auth-js';

const UNAUTHORIZED_STATUS_CODE = 403;
const USER_BLOCKED_ERROR_CODE = 'user_blocked';

export interface HttpOptions {
  skipErrorHandling?: boolean;
  allowAnonymous?: boolean;
  returnAllErrors?: boolean;
}

type Params =
  | HttpParams
  | {
    [param: string]: string | string[];
  };

@Injectable()
export class HttpService {

  public static isAuthError(error) {
    return error && error.status === UNAUTHORIZED_STATUS_CODE &&
      get(error, 'error.error_code') === USER_BLOCKED_ERROR_CODE;
  }

  private static readonly SESSION_ID: string = uuid();
  private readonly handleError: (
    error: HttpErrorResponse
  ) => ErrorObservable<any>;

  constructor(
    public http: HttpClient,
    private sentryService: SentryService,
    private firebaseAuth: FirebaseAuthServiceJS,
  ) {
    this.handleError = (error: HttpErrorResponse) => {
      sentryService.captureError(error);
      return Observable.throw(error);
    };
  }

  // noinspection JSUnusedLocalSymbols
  public getHeaders(options?: HttpOptions): Observable<any> {
    // return of({
    //   Authorization: 'Token // + testingToken ? testingToken : // Random',
    //   'CLIENT-SESSION-ID': HttpService.SESSION_ID,
    //   TIMEOFFSET: String(moment().utcOffset())
    // });

    // if (environment.skipLogin) {
    //   // const testingToken = this.plt.getQueryParam('token');
    //   return of({
    //     Authorization: 'Token // + testingToken ? testingToken : // Random',
    //     'CLIENT-SESSION-ID': HttpService.SESSION_ID,
    //     TIMEOFFSET: String(moment().utcOffset())
    //   });
    // } else {

    const observers: any[] = [];

    const tokenRequired = this.firebaseAuth.isAuthenticated() || (this.firebaseAuth.isLoginRequired() && (!options || !options.allowAnonymous));

    if (tokenRequired) {
      observers.push(this.firebaseAuth.getIdToken());
    }
    return zip(...observers).map(res => {
      console.log('res', res);
      const headers: any = {
        'CLIENT-SESSION-ID': HttpService.SESSION_ID,
        TIMEOFFSET: String(moment().utcOffset())
      };
      if (tokenRequired) {
        headers.Authorization = res[0];
      }
      return headers;
    });
  }

  public get(query: string, params?: any, options?: HttpOptions): Observable<any> {
    return this.request('GET', query, params, undefined, options);
  }

  public post(query: string, body: any, options?: HttpOptions): Observable<any> {
    return this.request('POST', query, undefined, body, options);
  }

  public put(query: string, body: any, options?: HttpOptions): Observable<any> {
    return this.request('PUT', query, undefined, body, options);
  }

  public patch(query: string, body: any, options?: HttpOptions): Observable<any> {
    return this.request('PATCH', query, undefined, body, options);
  }

  public delete(query: string, options?: HttpOptions): Observable<any> {
    return this.request('DELETE', query, undefined, undefined, options);
  }

  private request(type, query, params?: Params, body?: any, options?: HttpOptions) {
    return this.getHeaders(options).mergeMap(headers => {
      const httpOptions = {
        headers,
        params: params || undefined,
        body
      };
      let request = this.http.request(type, `${environment.apiUrl}/` + query, httpOptions);
      if (!options || !options.skipErrorHandling) {
        request = request.catch(this.handleError);
      }
      return request;
    });
  }
}
