import { FirebaseAuthService } from './firebase-auth';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class FirebaseAuthMock extends FirebaseAuthService {

    constructor() {
        super();
        this.onStateChangeListener({ id: 1 });
    }

    public sendPasswordResetEmail(email): Observable<any> {
        return Observable.create((subscriber) => {
            subscriber.next();
            subscriber.close();
        });
    }

    public signInWithEmail(credentials): Observable<any> {
        return Observable.create((subscriber) => {
            subscriber.next(credentials);
            subscriber.close();
        });
    }

    public signInWithFacebook(): Observable<any> {
        return Observable.create((subscriber) => {
            subscriber.next();
            subscriber.close();
        });
    }

    public signInWithGoogle(): Observable<any> {
        return Observable.create((subscriber) => {
            subscriber.next();
            subscriber.close();
        });
    }

    public signOut(): Observable<any> {
        return Observable.create((subscriber) => {
            subscriber.next();
            subscriber.close();
        });
    }

    public signUp(credentials): Observable<any> {
        return Observable.create((subscriber) => {
            subscriber.next(credentials);
            subscriber.close();
        });
    }

    protected _getIdToken(): Observable<any> {
        return Observable.create((subscriber) => {
            subscriber.next();
            subscriber.close();
        });
    }

    protected _signOut(): Observable<any> {
        throw new Error('Method not implemented.');
    }

    protected authStateChangeRegister() {
        /* ToDo: Add there some logic */
    }
}
