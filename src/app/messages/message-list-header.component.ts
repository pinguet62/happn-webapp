import {Component, Input} from '@angular/core';
import {User} from '../happn.service';

@Component({
  selector: 'app-message-list-header',
  template: `
    <div *ngIf="user" fxLayout="row" fxLayoutAlign="start center" [routerLink]="['/profile', user.id]">
      <img [src]="user.profiles[0].url" class="avatar">
      <h2>{{user.first_name}}</h2>
    </div>
  `
})
export class MessageListHeaderComponent {

  @Input()
  user: User;

}
