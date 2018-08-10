import {Component} from '@angular/core';
import {HappnService, Profile, User} from '../happn.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile',
  template: `
    <ng-template [ngIf]="user">
      <div fxLayout="row">
        <!-- photos -->
        <div fxLayout="column">
          <img [src]="selectedProfile.url" style="height: 500px;">
          <div>
            <img *ngFor="let photo of user.profiles" [src]="photo.url" style="height: 60px;" (click)="selectedProfile = photo">
          </div>
        </div>

        <!-- description -->
        <div>
          <p><b>{{user.first_name}}</b>, {{user.age}}</p>
          <p>{{user.job}} chez {{user.workplace}}</p>
          <p>A étudié à {{user.school}}</p>
          <p>Dernière activité : {{user.modification_date | parseIsoDate}}</p>
          <p>Distance : ???</p>
          <p>Description : {{user.about}}</p>
          <app-google-maps *ngIf="user.last_meet_position" [latitude]="user.last_meet_position.lat" [longitude]="user.last_meet_position.lon"></app-google-maps>
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    app-google-maps {
      display: block;
      width: 100%;
      height: 250px; /* TODO 50%*width */
    }
  `]
})
export class ProfileComponent {

  user: User;

  selectedProfile: Profile;

  constructor(
    private route: ActivatedRoute,
    private happnService: HappnService,
  ) {
    route.paramMap.subscribe((p) => {
      const userId = p.get('id');
      this.happnService.getProfile(userId).subscribe(user => {
        this.user = user;
        this.selectedProfile = this.user.profiles[0];
      })
      ;
    });
  }

}
