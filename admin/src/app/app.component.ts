import { Component } from '@angular/core';
import { NbIconLibraries } from '@nebular/theme';
import { SentryService } from './@core/services/sentry/sentry.service';
import { AuthUserService } from './@core/services/api/user/auth-user.service';
import { FirebaseAuthServiceJS } from './@core/services/auth/firebase-auth/firebase-auth-js';
import { Router } from '@angular/router';

@Component({
  selector: 'sp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private iconLibraries: NbIconLibraries,
    private sentry: SentryService,
    private userService: AuthUserService,
    private firebaseAuth: FirebaseAuthServiceJS,
    public router: Router,
  ) {
    this.iconLibraries.registerFontPack('nebular', { iconClassPrefix: 'nb' });
    this.iconLibraries.setDefaultPack('nebular');

    this.firebaseAuth.run();
    this.initializeConnection();
  }

  private initializeConnection() {
    this.userService.run();
    this.userService.initialized.subscribe(() => {
      this.userService.currentUser.subscribe((user) => {
        if (!user) {
          return;
        }
        this.router.navigate(['/dashboard']);
        this.sentry.setUserContext({ email: user.email });
      });
    });

  }

}
