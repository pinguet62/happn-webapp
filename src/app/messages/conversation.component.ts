import {Component, Input} from '@angular/core';
import {Conversation} from '../happn.service';

@Component({
  selector: 'app-conversation',
  template: `
    <app-messages [conversation]="conversation"></app-messages>
    <app-input></app-input>
  `,
  styles: [`
    :host {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    app-input {
      flex: 0 0 0%; /* height = content size */
    }

    app-messages {
      flex: 1; /* height = free space */
      overflow: auto;
    }
  `]
})
export class ConversationComponent {

  @Input()
  conversation: Conversation;

}
