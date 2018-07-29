import {Component} from '@angular/core';
import {HappnService, NearYouNotification, Relation, User} from '../happn.service';
import {tap} from 'rxjs/operators';

@Component({
  template: `
    <div fxLayout="row wrap">
      <mat-card *ngFor="let notification of notifications" [routerLink]="['/profile', notification.notifier.id]">
        <mat-card-header>
          <h3>{{notification.notifier.first_name}}</h3>
        </mat-card-header>
        <img mat-card-image [src]="notification.notifier.profiles[0].url">
        <mat-card-actions>
          <button (click)="rejectProfile(notification.notifier)" mat-icon-button>
            <mat-icon>delete</mat-icon>
          </button>
          <button *ngIf="notification.notifier.my_relation === 0" (click)="likeProfile(notification.notifier)" mat-icon-button>
            <mat-icon>favorite</mat-icon>
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    mat-card {
      max-width: 250px;
      margin: 10px;
    }
  `]
})
export class TimelinePageComponent {

  notifications: NearYouNotification[];

  constructor(private happnService: HappnService) {
    happnService.getTimeline().subscribe(it => this.notifications = it);
  }

  likeProfile(notifier: User) {
    this.happnService
      .acceptProfile(notifier.id)
      .pipe(tap(() => notifier.my_relation = Relation.ACCEPTED))
      .subscribe();
  }

  rejectProfile(notifier: User) {
    this.happnService
      .rejectProfile(notifier.id)
      // .pipe(tap(() => TODO remove))
      .subscribe();
  }

}
