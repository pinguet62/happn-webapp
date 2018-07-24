import {Component, Input} from '@angular/core';
import {Conversation, HappnService, Message} from './happn.service';
import {CurrentUserService} from './currentUser.service';

@Component({
  selector: 'app-messages',
  template: `
    <div>
      <app-message
        *ngFor="let message of messages"
        [avatar]="message.sender.profiles[0].url"
        [content]="message.message"
        [date]="message.creation_date | parseIsoDate"
        [sent]="message.sender.id === currentUser.userId"
      ></app-message>
    </div>
  `
})
export class MessagesComponent {

  messages: Message[];

  @Input()
  set conversation(value: Conversation) {
    if (!value) {
      this.messages = null;
    } else {
      this.happnService.getMessages(value.id).subscribe(messages => this.messages = messages);
    }
  }

  constructor(
    private happnService: HappnService,
    public currentUser: CurrentUserService,
  ) {
  }

}
