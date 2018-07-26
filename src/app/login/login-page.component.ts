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
                href="https://www.facebook.com/dialog/oauth?client_id=247294518656661&redirect_uri=https://www.happn.fr&scope=basic_info&response_type=token"
                target="_blank">
                Login with Facebook
              </a>
            </li>
            <li>
              Copy <code>access_token</code> parameter from URL:<br>
              <code>https://www.happn.com/en/#access_token=XXXXX&expires_in=5183805</code>
            </li>
            <li>
              <mat-form-field style="width: 100%;">
                <input
                  type="input"
                  [(ngModel)]="token" name="token"
                  #tokenModel="ngModel"
                  required
                  placeholder="Facebook token"
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
      .pipe(tap(() => this.router.navigate(['/timeline'])))
      .subscribe();
  }

}
