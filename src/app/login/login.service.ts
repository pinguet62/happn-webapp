import {Injectable} from '@angular/core';
import {CurrentUserService} from './currentUser.service';
import {tap} from 'rxjs/operators';
import {HappnService} from '../happn.service';

/** Manager for {@link CurrentUserService}. */
@Injectable()
export class LoginService {

  constructor(
    private happnService: HappnService,
    private currentUser: CurrentUserService,
  ) {
  }

  login(facebookToken: string) {
    return this.happnService.newAuthToken(facebookToken) // TODO if refreshToken: happnService.refreshAuthToken(...)
      .pipe(tap(res => {
        this.currentUser.facebookToken = facebookToken;
        this.currentUser.accessToken = res.access_token;
        this.currentUser.userId = res.user_id;
      }));
  }

}
