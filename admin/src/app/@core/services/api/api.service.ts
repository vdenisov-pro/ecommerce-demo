import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public get(route, params?): Observable<any> {
    return this.http.get(`${this.host}/${route}`, params);
  }

  public post(route, data, params?): Observable<any> {
    return this.http.post(`${this.host}/${route}`, data, params);
  }

  public put(route, data, params?): Observable<any> {
    return this.http.put(`${this.host}/${route}`, data, params);
  }

  public delete(route, params?): Observable<any> {
    return this.http.delete(`${this.host}/${route}`, params);
  }
}
