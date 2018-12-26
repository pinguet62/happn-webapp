import {Injectable} from '@angular/core';
import {LocalStorage} from '../localStorageProxy';

/** Simple store for user information. */
@Injectable()
export class CurrentUserService {

  @LocalStorage('accessToken')
  accessToken: string;

  @LocalStorage('expiresAt')
  expiresAt: number;

  @LocalStorage('refreshToken')
  refreshToken: string;

  @LocalStorage('userId')
  userId: string;

  isLogged() {
    return [this.accessToken, this.expiresAt, this.refreshToken, this.userId].filter(it => it == null).length === 0;
  }

  isLoggedAndExpired() {
    return this.isLogged() && new Date(this.expiresAt).getTime() < Date.now();
  }

}
