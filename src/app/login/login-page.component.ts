import {Component} from '@angular/core';
import {LoginService} from './login.service';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  template: `
    <form #loginForm="ngForm" (ngSubmit)="login()">
      <mat-card class="login-card">
        <mat-card-content fxLayout="column">
          <ol>
            <li>
              <a
                href="https://www.facebook.com/dialog/oauth?client_id=247294518656661&redirect_uri=fbconnect%3A%2F%2Fsuccess&scope=email%2Cuser_birthday%2Cuser_friends%2Cpublic_profile%2Cuser_photos%2Cuser_likes&response_type=token"
                target="_blank">
                Open Facebook login dialog
              </a>
            </li>
            <li>Open <code>Network</code> tab in your browser: press <code>F12</code> key</li>
            <li>Validate Facebook authentication, by clicking on <code>OK</code> button</li>
            <li>In <code>Network</code> tab, open <code>confirm</code> call</li>
            <li>
              In <code>Response</code> sub-tab, copy <code>access_token</code> value:<br>
              <i>Example: <code>success#access_token=XXXXX&expires_in</code> copy <code>XXXXX</code> value</i>
            </li>
            <li>
              <mat-form-field style="width: 100%;">
                <input
                  type="input"
                  [(ngModel)]="token" name="token"
                  #tokenModel="ngModel"
                  required
                  placeholder="Access token"
                  matInput>
              </mat-form-field>
            </li>
          </ol>
        </mat-card-content>

        <mat-card-actions>
          <button
            type="submit"
            [disabled]="!loginForm.form.valid"
            mat-raised-button color="primary" style="width: 100%;">
            Login
          </button>
        </mat-card-actions>
      </mat-card>
    </form>
  `,
  styles: [`
    .login-card {
      max-width: 550px;
      margin-left: auto;
      margin-right: auto;
    }
  `]
})
export class LoginPageComponent {

  token = '';

  constructor(
    private router: Router,
    private loginService: LoginService,
  ) {
  }

  login() {
    this.loginService
      .login(this.token)
      .pipe(tap(() => this.router.navigate(['/'])))
      .subscribe();
  }

}
