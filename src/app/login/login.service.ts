import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {CurrentUserService} from './currentUser.service';
import {tap} from 'rxjs/operators';

interface LoginResponse {
  access_token: string;
  user_id: string;
  // ...
}

@Injectable()
export class LoginService {

  public static readonly LOCALSTORAGE_FACEBOOK_TOKEN = 'facebook_token';

  public facebookToken: string | null;

  constructor(
    private http: HttpClient,
    private currentUser: CurrentUserService,
  ) {
    this.facebookToken = window.localStorage.getItem(LoginService.LOCALSTORAGE_FACEBOOK_TOKEN);
  }

  login(facebookToken: string) {
    const body = new HttpParams()
      .set('client_id', 'FUE-idSEP-f7AqCyuMcPr2K-1iCIU_YlvK-M-im3c')
      .set('client_secret', 'brGoHSwZsPjJ-lBk0HqEXVtb3UFu-y5l_JcOjD-Ekv')
      .set('grant_type', 'assertion')
      .set('assertion_type', 'facebook_access_token')
      .set('assertion', facebookToken)
      .set('scope', 'mobile_app');
    return this.http.post<LoginResponse>(
      'https://api.happn.fr/connect/oauth/token',
      body.toString(),
      {
        headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
      })
      .pipe(tap(res => {
        this.currentUser.accessToken = res.access_token;
        this.currentUser.userId = res.user_id;
      }))
      .pipe(tap(() => {
        this.facebookToken = facebookToken;
        window.localStorage.setItem(LoginService.LOCALSTORAGE_FACEBOOK_TOKEN, this.facebookToken);
      }));
  }

}
