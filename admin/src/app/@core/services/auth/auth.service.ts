import { Injectable } from '@angular/core';
import { SentryService } from '../sentry/sentry.service';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { User as FirebaseUser } from 'firebase/app';

import { Observable } from 'rxjs';
import { HttpService } from '../http/http';
import 'rxjs/add/observable/fromPromise';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState: FirebaseUser = null;

  constructor(
    private afAuth: AngularFireAuth,
    private httpService: HttpService,
    private sentryService: SentryService
  ) {
    this.afAuth.authState.subscribe((user: FirebaseUser) => {
      this.authState = user;
      if (user && user.email) {
        this.sentryService.setUserContext({ email: user.email });
      }
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }
  get currentUser(): any {
    return this.authState;
  }
  get currentUserObservable(): Observable<any> {
    return this.afAuth.authState;
  }
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }
  get accessToken(): Observable<string> {
    return Observable.fromPromise(this.authState.getIdToken());
  }

  public signIn(mail: string, pass: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(mail, pass);
  }
  public signOut() {
    return this.afAuth.auth.signOut();
  }
  public sendPasswordResetEmail(mail: string) {
    return this.afAuth.auth.sendPasswordResetEmail(mail);
  }

  public loginWithGoggle() {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return this.socialSignIn(googleProvider);
  }
  public loginWithFacebook() {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    return this.socialSignIn(facebookProvider);
  }
  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then(credential => {
      this.authState = credential.user;
      return credential;
    });
  }

  public checkThatUserExistsOnServer(email, password) {
    return this.httpService.post('auth/login', { email, password }).toPromise();
  }
}
