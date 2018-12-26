import {Injectable} from '@angular/core';
import {CurrentUserService} from './currentUser.service';
import {tap} from 'rxjs/operators';
import {HappnService} from '../happn.service';
import {EMPTY, Observable} from 'rxjs';

/** Manager for {@link CurrentUserService}. */
@Injectable()
export class LoginService {

  constructor(
    private happnService: HappnService,
    private currentUser: CurrentUserService,
  ) {
  }

  refreshTokenIfNecessary(): Observable<any> {
    if (!this.currentUser.isLoggedAndExpired()) {
      return EMPTY;
    }
    return this.happnService.refreshAuthToken(this.currentUser.refreshToken)
      .pipe(tap(res => this.processLogin(res)));
  }

  login(facebookToken: string) {
    return this.happnService.newAuthToken(facebookToken)
      .pipe(tap(res => this.processLogin(res)));
  }

  private processLogin(res: any) {
    console.log(res);
    this.currentUser.accessToken = res.access_token;
    this.currentUser.expiresAt = Date.now() + res.expires_in * 1000;
    this.currentUser.refreshToken = res.refresh_token;
    this.currentUser.userId = res.user_id;
  }

}
