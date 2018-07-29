import {Component} from '@angular/core';
import {ObservableMedia} from '@angular/flex-layout';

@Component({
  template: `
    <mat-toolbar color="primary">
      <button (click)="sidenav.toggle()" aria-label="Menu" mat-icon-button>
        <mat-icon>menu</mat-icon>
      </button>

      <button routerLink="/" fxShow.lt-md="false" mat-button><h1>Happn</h1></button>
      <span>Happn</span>
    </mat-toolbar>

    <mat-sidenav-container fullscreen style="margin-top: 64px;">
      <mat-sidenav
        #sidenav
        [mode]="media.isActive('gt-sm') ? 'side' : 'over'"
        [opened]="media.isActive('gt-sm')"
        [fixedInViewport]="!media.isActive('gt-sm')">

        <mat-nav-list>
          <mat-list-item
            routerLink="/timeline" (click)="media.isActive('gt-sm') ? null : sidenav.close()"
            routerLinkActive="menu-selected" [routerLinkActiveOptions]="{exact: true}">
            <mat-icon mat-list-icon>timeline</mat-icon>
            <span mat-line>Timeline</span>
          </mat-list-item>

          <mat-list-item
            routerLink="/messages" (click)="media.isActive('gt-sm') ? null : sidenav.close()"
            routerLinkActive="menu-selected">
            <mat-icon mat-list-icon>message</mat-icon>
            <span mat-line>Messages</span>
          </mat-list-item>

          <mat-list-item
            routerLink="/me" (click)="media.isActive('gt-sm') ? null : sidenav.close()"
            routerLinkActive="menu-selected">
            <mat-icon mat-list-icon>person</mat-icon>
            <span mat-line>My profile</span>
          </mat-list-item>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <main ngClass.gt-sm="content-web">
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    mat-sidenav mat-list-item span {
      padding-right: 30px;
    }

    .menu-selected {
      color: #3f51b5;
    }
  `, `
    .content-web {
      width: 75%;
      height: 100%;
      padding: 25px;
      margin: auto;
    }
  `, `
    /* <mat-sidenav mode="side"> cover outside <mat-toolbar> */
    /deep/ .mat-drawer-backdrop.mat-drawer-shown {
      position: fixed;
    }
  `]
})
export class LayoutComponent {

  constructor(public media: ObservableMedia) {
  }

}
