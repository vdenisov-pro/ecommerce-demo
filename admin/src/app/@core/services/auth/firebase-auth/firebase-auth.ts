import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { environment } from 'src/environments/environment';

@Injectable()
export abstract class FirebaseAuthService {
    public initialized = new AsyncSubject<boolean>();
    public currentUser = new BehaviorSubject<any>(undefined);
    private readonly _requiredLogin: boolean = environment.loginRequired as any;

    public run() {
        this.authStateChangeRegister();
    }

    public isLoginRequired() {
        return this._requiredLogin;
    }

    public isAuthenticated() {
        return !!this.currentUser.getValue();
    }

    public getIdToken(): Observable<any> {
        if (this.isAuthenticated()) {
            return this._getIdToken();
        } else {
            throw new Error('User not logged in!');
        }
    }

    public signOut(): Observable<any> {
        if (this.isAuthenticated()) {
            return this._signOut().do(() => {
                this.onStateChangeListener(undefined);
            });
        } else {
            throw new Error('SignOut - user not logged in!');
        }
    }

    public abstract signInWithEmail(email, pass): Observable<any>;

    public abstract signInWithGoogle(): Observable<any>;

    public abstract signInWithFacebook(): Observable<any>;

    public abstract signUp(credentials): Observable<any>;

    public abstract sendPasswordResetEmail(email): Observable<any>;

    protected abstract _getIdToken(): Observable<any>;

    protected abstract _signOut(): Observable<any>;

    protected abstract authStateChangeRegister();

    protected onStateChangeListener(user: any) {
        const currentUser = this.currentUser.getValue();
        if (currentUser !== user) {
            this.currentUser.next(user && user.uid ? user : undefined);
        }
        this.initialized.next(true);
        this.initialized.complete();
    }
}
