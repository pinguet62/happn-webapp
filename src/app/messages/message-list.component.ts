import {Component, Input} from '@angular/core';
import {Conversation, HappnService, Message, User} from '../happn.service';
import {CurrentUserService} from '../login/currentUser.service';

@Component({
  selector: 'app-message-list',
  template: `
    <app-message-list-header [user]="user"></app-message-list-header>

    <app-message-list-message
      *ngFor="let message of messages"
      [avatar]="message.sender.profiles[0].url"
      [content]="message.message"
      [date]="message.creation_date | parseIsoDate"
      [sent]="message.sender.id === currentUser.userId"
    ></app-message-list-message>
  `
})
export class MessageListComponent {

  user: User;

  messages: Message[];

  @Input()
  set conversation(value: Conversation) {
    if (!value) {
      this.messages = null;
    } else {
      this.user = value.participants.filter(p => p.user.id !== this.currentUser.userId)[0].user;
      this.happnService.getMessages(value.id).subscribe(messages => this.messages = messages);
    }
  }

  constructor(
    private happnService: HappnService,
    public currentUser: CurrentUserService,
  ) {
  }

}
