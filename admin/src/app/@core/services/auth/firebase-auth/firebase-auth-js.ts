import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { FirebaseAuthService } from './firebase-auth';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { AngularFireAuth } from 'angularfire2/auth';
import UserCredential = firebase.auth.UserCredential;

@Injectable()
export class FirebaseAuthServiceJS extends FirebaseAuthService {
    constructor(private afAuth: AngularFireAuth) {
        super();
    }

    public signInWithEmail(email: string, password: string): Observable<any> {
        return fromPromise(this.afAuth.auth.signInWithEmailAndPassword(email, password));
    }

    public signInWithGoogle(): Observable<UserCredential> {
        return fromPromise(this.oauthSignIn(new firebase.auth.GoogleAuthProvider()));
    }

    public signInWithFacebook(): Observable<UserCredential> {
        return fromPromise(this.oauthSignIn(new firebase.auth.FacebookAuthProvider()));
    }

    public signUp(credentials): Observable<any> {
        return fromPromise(this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password));
    }

    public sendPasswordResetEmail(email): Observable<any> {
        return fromPromise(this.afAuth.auth.sendPasswordResetEmail(email));
    }

    protected _getIdToken(): Observable<any> {
        return fromPromise(this.afAuth.auth.currentUser.getIdToken());
    }

    protected _signOut(): Observable<any> {
        return fromPromise(this.afAuth.auth.signOut());
    }

    protected authStateChangeRegister() {
        this.afAuth.authState.subscribe(
            (user) => {
                this.onStateChangeListener(user);
            },
            (err) => {
              console.error('get_user_firebase_error');
            }
        );
    }

    private oauthSignIn(provider: firebase.auth.AuthProvider): Promise<any> {
        return this.afAuth.auth.signInWithPopup(provider);
    }
}
