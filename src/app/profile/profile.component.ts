import {Component} from '@angular/core';
import {HappnService, User} from '../happn.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile',
  template: `
    <ng-template [ngIf]="user">
      <ngb-carousel>
        <ng-template *ngFor="let photo of user.profiles" ngbSlide>
          <img [src]="photo.url">
        </ng-template>
      </ngb-carousel>

      <p><b>{{user.first_name}}</b>, {{user.age}}</p>
    </ng-template>
  `
})
export class ProfileComponent {

  user: User;

  constructor(
    private route: ActivatedRoute,
    private happnService: HappnService,
  ) {
    route.paramMap.subscribe((p) => {
      const userId = p.get('id');
      this.happnService.getProfile(userId).subscribe(user =>
        this.user = user
      );
    });
  }

}
