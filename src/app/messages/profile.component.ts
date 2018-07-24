import {Component, Input} from '@angular/core';
import {HappnService, User} from '../happn.service';

@Component({
  selector: 'app-profile',
  template: `
    Profile...
    <div *ngIf="user">
      <ngb-carousel>
        <ng-template *ngFor="let photo of user.profiles" ngbSlide>
          <img [src]="photo.url">
        </ng-template>
      </ngb-carousel>

      <p><b>{{user.first_name}}</b>, {{user.age}}</p>
    </div>
  `
})
export class ProfileComponent {

  private _user: User;

  get user() {
    return this._user;
  }

  @Input()
  set user(value: User) {
    if (!value) {
      this._user = null;
    } else {
      this.happnService.getProfile(value.id).subscribe(user => this._user = user);
    }
  }

  constructor(private happnService: HappnService) {
  }

}
