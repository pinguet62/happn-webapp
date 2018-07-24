import {Component} from '@angular/core';
import {Conversation} from './happn.service';

@Component({
  selector: 'app-root',
  template: `
    <div fxLayout="row">
      <app-contacts (selected)="conversation = $event" fxFlex="30"></app-contacts>
      <app-messages [conversation]="conversation" fxFlex="50"></app-messages>
      <app-profile [user]="conversation?.participants[1].user" fxFlex="20"></app-profile>
    </div>
  `
})
export class AppComponent {

  conversation: Conversation;

}
