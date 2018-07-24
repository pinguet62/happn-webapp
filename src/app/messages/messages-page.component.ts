import {Component} from '@angular/core';
import {Conversation} from '../happn.service';

@Component({
  template: `
    <div fxLayout="row" class="scroll-children">
      <app-contacts (selected)="conversation = $event" fxFlex="30"></app-contacts>
      <app-conversation [conversation]="conversation" fxFlex="50"></app-conversation>
      <app-profile [user]="conversation?.participants[1].user" fxFlex="20"></app-profile>
    </div>
  `,
  styles: [`
    .scroll-children {
      height: 100%;
    }

    .scroll-children > * {
      overflow: auto;
    }
  `]
})
export class MessagesPageComponent {

  conversation: Conversation;

}
