import {APP_INITIALIZER, Provider} from '@angular/core';
import {LoginService} from './login.service';

export function refreshTokenFactory(loginService: LoginService): () => Promise<any> {
  return () => loginService.refreshTokenIfNecessary().toPromise();
}

export const refreshTokenProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: refreshTokenFactory,
  deps: [LoginService],
  multi: true
};
