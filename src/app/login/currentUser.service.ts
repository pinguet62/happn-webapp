import {Injectable} from '@angular/core';
import {LocalStorage} from '../localStorageProxy';

/** Simple store for user information. */
@Injectable()
export class CurrentUserService {

  @LocalStorage('facebook_token')
  facebookToken: string | null;

  @LocalStorage('access_token')
  accessToken: string | null;

  @LocalStorage('user_id')
  userId: string | null;

  isLogged() {
    return this.facebookToken !== null && this.accessToken !== null && this.userId !== null;
  }
}
