import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {
  init,
  captureException,
  captureMessage,
  configureScope,
  withScope
} from '@sentry/browser';
import { environment } from '../../../../environments/environment';

export interface ErrorServiceOptions {
  extra?: {
    [key: string]: any
  };
  tags?: {
    [key: string]: string
  };
}

export function sentryInit() {
  init({
    dsn: environment.sentryDsn,
  });
}

@Injectable()
export class SentryService {
  public static readonly ERROR_TYPE_TAG = 'error_type';

  static addScopeExtra(scope, extra: {[key: string]: any}) {
    for (const key of Object.keys(extra)) {
      scope.setExtra(key, extra[key]);
    }
  }

  static addScopeTags(scope, tags: {[key: string]: string}) {
    for (const key of Object.keys(tags)) {
      scope.setTag(key, tags[key]);
    }
  }

  public captureMessage(message, options?: ErrorServiceOptions) {
    withScope(() => {
      this.setScopeOptions(options);
      captureMessage(message);
    });
  }

  public captureException(error, options?: ErrorServiceOptions) {
    withScope(() => {
      this.setScopeOptions(options);
      captureException(error);
    });
  }

  public captureError(error, options?: ErrorServiceOptions) {
    const type = typeof error;
    if (type === 'boolean' || type === 'string' || type === 'number' || error == null) {
      this.captureMessage(error, options);
    } else if (error instanceof HttpErrorResponse) {
      options = {
        ...options
      };
      options.tags = {
        [SentryService.ERROR_TYPE_TAG]: 'http',
        ...options.tags
      };
      this.captureMessage(error, options);
    } else {
      this.captureException(error, options);
    }
  }

  public setUserContext(userData?: any) {
    configureScope((scope) => scope.setUser(userData ? userData : null));
  }

  private setScopeOptions(options?: ErrorServiceOptions) {
    if (!options) {
      return;
    }
    configureScope((scope) => {
      if (options.extra) {
        SentryService.addScopeExtra(scope, options.extra);
      }
      if (options.tags) {
        SentryService.addScopeTags(scope, options.tags);
      }
    });
  }
}

@Injectable()
export class SentryErrorHandler extends ErrorHandler {
  public constructor(private injector: Injector) {
    super();
  }

  public handleError(err: any): void {
    try {
      console.error(err);
      super.handleError(err);
      const sentry = this.injector.get(SentryService);
      sentry.captureError(err && err.originalError || err);
    } catch (e) {
      console.error(e);
    }
  }
}
