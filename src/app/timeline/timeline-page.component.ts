import {Component} from '@angular/core';
import {HappnService, NearYouNotification} from '../happn.service';

@Component({
  template: `
    <div fxLayout="row wrap">
      <mat-card *ngFor="let notification of notifications">
        <mat-card-header>
          <h3>{{notification.notifier.first_name}}</h3>
        </mat-card-header>
        <img mat-card-image [src]="notification.notifier.profiles[0].url">
        <mat-card-actions>
          <button mat-button>Decline</button>
          <button mat-button *ngIf="notification.notifier.my_relation === 0">Like</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    mat-card {
      max-width: 400px;
      margin: 10px;
    }
  `]
})
export class TimelinePageComponent {

  notifications: NearYouNotification[];

  constructor(private happnService: HappnService) {
    happnService.getTimeline().subscribe(it => this.notifications = it);
  }

}
