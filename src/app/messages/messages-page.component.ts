import {Component} from '@angular/core';
import {Conversation} from '../happn.service';

@Component({
  template: `
    <div fxLayout="row" class="scroll-children">
      <app-contact-list (selected)="conversation = $event" fxFlex="35"></app-contact-list>
      <app-conversation [conversation]="conversation" fxFlex="65"></app-conversation>
    </div>
  `,
  styles: [`
    .scroll-children {
      height: 100%;
    }

    app-contact-list {
      overflow: auto;
    }
  `]
})
export class MessagesPageComponent {

  conversation: Conversation;

}
