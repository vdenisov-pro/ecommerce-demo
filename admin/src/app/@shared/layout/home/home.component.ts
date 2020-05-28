import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthUserService } from 'src/app/@core/services/api/user/auth-user.service';

@Component({
  selector: 'sp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public user$: Observable<object>;

  constructor(private router: Router, private authService: AuthUserService) {}

  ngOnInit() {
    this.user$ = this.authService.currentUser;
  }

  async onLogout() {
    try {
      await this.authService.signOut();
      this.router.navigate(['/auth/login']);
    } catch (err) {}
  }

  async goToAuthForm() {
    this.router.navigate(['/auth/login']);
  }
}
