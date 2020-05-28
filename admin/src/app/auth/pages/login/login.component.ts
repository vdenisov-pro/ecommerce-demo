import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastService } from 'src/app/@core/services/toast/toast.service';
import { SentryService } from 'src/app/@core/services/sentry/sentry.service';
import { FirebaseAuthServiceJS } from 'src/app/@core/services/auth/firebase-auth/firebase-auth-js';

// TODO: replace to shared
const Patterns = {
  patternEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{ 1,3 }\.[0-9]{ 1,3 }\.[0-9]{ 1,3 }\.[0-9]{ 1,3 }])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{ 2, }))$/
};


// TODO: extends with NbLoginComponent
@Component({
  selector: 'sp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public redirectDelay: number = 0;
  public showMessages: any = {};
  public strategy: string = '';

  public errors: string[] = [];
  public messages: string[] = [];
  public submitted: boolean = false;

  public rememberMe = false;

  public user: any = { email: '', password: '' };
  public loginForm: FormGroup;

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private authService: FirebaseAuthServiceJS,
    private toastService: ToastService,
    private sentryService: SentryService,
  ) { }

  public ngOnInit() {
    this.loginForm = this.fb.group({
      userEmail: new FormControl('', [
        Validators.required,
        Validators.pattern(Patterns.patternEmail)
      ]),

      userPass: new FormControl('', [Validators.required])
    });
  }

  public authFacebook() {
    // console.log('authFacebook');
  }

  public authGoogle() {
    // console.log('authGoogle');
  }

  public onLogin() {
    // STEP 1: get email/pass from login form
    const { email: userEmail, password: userPass } = this.user;
    if (userEmail === '' || userPass === '') { return false; }

    this.authService.signInWithEmail(userEmail, userPass).subscribe(
      () => {
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        this.sentryService.captureError(err);
        this.toastService.showToastDanger('Что-то сломалось', 'Уже чиним');
      }
    );
  }
}
