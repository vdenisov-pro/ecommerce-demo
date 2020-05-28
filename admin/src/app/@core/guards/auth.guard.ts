import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthUserService } from '../services/api/user/auth-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthUserService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.canNavigate();
  }
}
