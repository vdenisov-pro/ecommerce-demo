import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { Subscription } from 'rxjs/Subscription';
// import { timestampToIsoString, isoStringToTimestamp } from 'src/app/@core/utils/date-utils';
import { PrivateUser } from 'src/app/@core/models/user.model';
import { HttpService } from '../../http/http';
import { SentryService } from '../../sentry/sentry.service';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { FirebaseAuthServiceJS } from '../../auth/firebase-auth/firebase-auth-js';

export interface AuthCredentials {
    email: string;
    password: string;
}

const TextData = {
  ERROR_GETTING_USER_DATA: 'ERROR_GETTING_USER_DATA',
  MISSING_EMAIL: 'MISSING_EMAIL',
  AUTHORIZATION_GENERAL_SIGNIN_ERROR: 'AUTHORIZATION_GENERAL_SIGNIN_ERROR',
  AUTHORIZATION_GENERAL_SOCIAL_ERROR: 'AUTHORIZATION_GENERAL_SOCIAL_ERROR',
  AUTHORIZATION_GENERAL_RESET_PASSWORD_ERROR: 'AUTHORIZATION_GENERAL_RESET_PASSWORD_ERROR',
  SIGN_UP_ALERT_CANCEL_BUTTON_TEXT: 'SIGN_UP_ALERT_CANCEL_BUTTON_TEXT',
  AUTHORIZATION_GENERAL_ERROR: 'AUTHORIZATION_GENERAL_ERROR',
  OH_TITLE: 'OH_TITLE',
};

const SIGN_UP_EVENT_NAME = 'user_signup';
const SIGN_IN_EVENT_NAME = 'user_signin';

@Injectable()
export class AuthUserService {
    public readonly currentUser = new BehaviorSubject<PrivateUser>(undefined);
    public readonly loggedIn = new BehaviorSubject<boolean>(false);
    public readonly initialized = new AsyncSubject<void>();

    private _currentUserInstance: PrivateUser;

    constructor(
        private httpService: HttpService,
        private firebaseAuth: FirebaseAuthServiceJS,
        private sentry: SentryService,
        private router: Router,
    ) {}

    public getCurrentUser(): PrivateUser {
        return this._currentUserInstance;
    }

    public isLoggedIn(): boolean {
        return !!this._currentUserInstance;
    }

    public isLoginRequired(): boolean {
        return this.firebaseAuth.isLoginRequired();
    }

    public isLoggedInOrAnonymousAllowed() {
        return this.isLoggedIn() || !this.isLoginRequired();
    }

    public showSignUpModal() {

    }

    public ensureUserLogin(func: () => any) {
        if (this.isLoggedIn()) {
            func();
        } else {
            this.showSignUpModal();
        }
    }

    public canNavigate(): boolean | Promise<boolean> {
        if (this.isLoggedIn()) {
            return true;
        } else {
            return new Promise((resolve) => {
                this.initialized.subscribe(() => {
                    resolve(this.isLoggedInOrAnonymousAllowed());
                });
            });
        }
    }

    public run() {
        this.firebaseAuth.initialized.subscribe(() => {
            this.firebaseAuth.currentUser.subscribe((firebaseUser) => {
                if (firebaseUser) {
                    this.load().subscribe(
                        () => {
                            this.setInitialized();
                        },
                        (e) => {
                            if (HttpService.isAuthError(e)) {
                                this.signOut();
                                this.setInitialized();
                                return;
                            }

                            this.sentry.captureError(e);
                            if (firebaseUser) {
                                this.signOut();
                            }
                            this.setInitialized();
                        }
                    );
                } else {
                    this.setUser(undefined);
                    this.setInitialized();
                }
            });
        });
    }

    public load(): Observable<PrivateUser> {
        return this.httpService.get(`/users/current`, null, { returnAllErrors: true }).map((data) => {
            return this.setUser(this.createInstance(data));
        });
    }

    public update(object): Observable<PrivateUser> {
        return this.httpService.put(`/users/current`, object).map((data) => {
            return this.setUser(this.createInstance(data));
        });
    }

    // noinspection JSUnusedGlobalSymbols
    public partialUpdate(object): Observable<PrivateUser> {
        return this.httpService.patch(`/users/current`, object).map((data) => {
            return this.setUser(this.createInstance(data));
        });
    }

    public subscribeFirstUserAvailable(...args): Subscription {
        return this.currentUser.first((user) => !!user).subscribe(...args);
    }

    public signOut() {
        if (this.firebaseAuth.isAuthenticated()) {
            this.firebaseAuth.signOut().subscribe(
                () => {
                  this.router.navigate(['/auth/login']);
                },
                (error) => {
                    this.sentry.captureError(error);
                }
            );
        } else {
          this.router.navigate(['/auth/login']);
        }
    }

    public signUp(credentials: AuthCredentials): Observable<PrivateUser> {
        const operation = this.firebaseAuth.signUp(credentials).do(() => {
            // this.as.setSingUpFlow(true);
        });

        const eventProperties = { type: 'email' };

        return this.waitUnitCurrentUserRetrieved(operation)
            .do((user) => {
                this.logEventSignInOrSignUp(SIGN_UP_EVENT_NAME, eventProperties, user);
            })
            .catch((error) => {
                return this.handleSignUpErrorCase(error, SIGN_UP_EVENT_NAME, eventProperties, credentials);
            });
    }

    public signInWithGoogle(): Observable<any> {
        return this.handleSignInOrSignUpFlow(this.firebaseAuth.signInWithGoogle(), 'google');
    }

    public signInWithFacebook(): Observable<any> {
        return this.handleSignInOrSignUpFlow(this.firebaseAuth.signInWithFacebook(), 'facebook');
    }

    public signInWithEmail(email: string, password: string): Observable<PrivateUser> {
        const operation = this.firebaseAuth.signInWithEmail(email, password);
        const eventProperties = { type: 'email' };
        return this.waitUnitCurrentUserRetrieved(operation)
            .do((user) => {
                this.logEventSignInOrSignUp(SIGN_IN_EVENT_NAME, eventProperties, user);
            })
            .catch((error) => {
                return this.handleErrorCase(error, SIGN_IN_EVENT_NAME, TextData.AUTHORIZATION_GENERAL_SIGNIN_ERROR, eventProperties);
            });
    }

    public sendPasswordResetEmail(email: string) {
        return this.firebaseAuth
            .sendPasswordResetEmail(email)
            .map((result) => result)
            .catch((error) => {
                return this.handleErrorCase(error, 'send_password_reset', TextData.AUTHORIZATION_GENERAL_RESET_PASSWORD_ERROR);
            });
    }

    public getIdToken(): Observable<any> {
        return this.firebaseAuth.getIdToken();
    }

    private handleErrorCase(error: any, eventName: string, message: string, eventProperties?: object) {
        this.sentry.captureError(error);
        // const title = TextData.OH_TITLE;
        // this.as.logAPIError(eventName, message, eventProperties);
        // this.alert.presentAlertV2({
        //     title,
        //     detail: message,
        //     eventName: `${eventName}_error`,
        //     buttons: [AlertButtons.OK]
        // });
        return Observable.throw(error);
    }

    private waitUnitCurrentUserRetrieved(operation: Observable<any>): Observable<PrivateUser> {
        return operation.mergeMap(() => {
          // TODO add filter !!user
            return this.currentUser;
        });
    }

    // noinspection JSMethodCanBeStatic
    // private getErrorMessage(error: any) {
    //     let message: string;
    //     if (typeof error === 'string') {
    //         message = error;
    //     } else {
    //         message = TextData.AUTHORIZATION_GENERAL_ERROR;
    //     }
    //     return message;
    // }

    private handleSignUpErrorCase(
        error: any,
        eventName: string,
        eventProperties: object,
        credentials: AuthCredentials
    ) {
        this.sentry.captureError(error);
        // const message = this.getErrorMessage(error);
        // this.as.logAPIError(eventName, message, eventProperties);
        // const title = TextData.OH_TITLE;
        // this.alert.presentAlertV2({
        //     title,
        //     detail: message,
        //     eventName: `${eventName}_error`,
        //     buttons: [
        //         {
        //             text: TextData.SIGN_UP_ALERT_CANCEL_BUTTON_TEXT,
        //             role: 'cancel',
        //         },
        //         {
        //             text: TextData.SIGN_UP_ALERT_LOGIN_BUTTON_TEXT,
        //             cssClass: 'alert-cta-button',
        //             callback: () => {
        //                 return this.appCtrl.getActiveNav().setRoot(
        //                     'SigninPage',
        //                     { email: credentials.email },
        //                     {
        //                         animate: true,
        //                         direction: 'forward'
        //                     }
        //                 );
        //             }
        //         }
        //     ],
        //     // alertSound: ALERT_SOUND_TYPES.ALERT_NEGATIVE
        // });
        return Observable.throw(error);
    }

    // noinspection JSMethodCanBeStatic
    private createInstance(data: any): PrivateUser {
        return new PrivateUser(data);
    }

    private setInitialized() {
        this.initialized.next(undefined);
        this.initialized.complete();
    }

    private setUser(user: PrivateUser): PrivateUser {
        const prevUser = this._currentUserInstance;
        if (prevUser !== user) {
            this._currentUserInstance = user;
            this.currentUser.next(user);

            if (isLoggedInChanged(user, prevUser)) {
                this.loggedIn.next(!!user);
            }

            this.sentry.setUserContext(user);
        }
        return user;
    }

    private handleSignInOrSignUpFlow(operation: Observable<any>, type: string) {
        let eventName = SIGN_UP_EVENT_NAME;
        operation = operation.do((user) => {
            const signInFlow = !!user.isNewUser;
            eventName = signInFlow ? SIGN_UP_EVENT_NAME : SIGN_IN_EVENT_NAME;
            // this.as.setSingUpFlow(signInFlow);
        });
        const eventProperties = { type };
        return this.waitUnitCurrentUserRetrieved(operation)
            .do((user) => {
                this.logEventSignInOrSignUp(eventName, eventProperties, user);
            })
            .catch((error) => {
                return this.handleErrorCase(error, eventName,  TextData.AUTHORIZATION_GENERAL_SOCIAL_ERROR, eventProperties);
            });
    }

    private logEventSignInOrSignUp(eventName: string, eventProperties: object, user: PrivateUser) {
      //
    }

    // noinspection JSMethodCanBeStatic
    // private extendEventPropertyWithUser(eventProperties: object, user: PrivateUser): object {
    //     const dateJoined = user.date_joined;
    //     if (dateJoined) {
    //         eventProperties['date_joined'] = timestampToIsoString(isoStringToTimestamp(dateJoined));
    //     }
    //     return eventProperties;
    // }
}

function isLoggedInChanged(currentUser, prevUser): boolean {
    return !!currentUser !== !!prevUser;
}
