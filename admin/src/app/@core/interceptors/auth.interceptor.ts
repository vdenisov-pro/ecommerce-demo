import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthUserService } from '../services/api/user/auth-user.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthUserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.getIdToken()
      .mergeMap((accessToken: string) => {
        if (accessToken) {
          request = request.clone({
            setHeaders: { Authorization: `${accessToken}` }
          });
        }

        return next.handle(request).pipe(tap(() => { },
          (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                // this.authService.signOut();
                this.router.navigate(['/auth/login']);
              }
              return;
            }
          }
        ));
      });
  }
}
