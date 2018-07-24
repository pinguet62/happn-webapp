import {Component, EventEmitter, Output} from '@angular/core';
import {Conversation, HappnService, User} from './happn.service';
import {CurrentUserService} from './currentUser.service';

@Component({
  selector: 'app-contacts',
  template: `
    <mat-list>
      <mat-list-item *ngFor="let entry of userByConversation" (click)="selected.emit(entry.conversation)">
        <img matListAvatar [src]="entry.user.profiles[0].url">
        <p mat-line class="mat-card-title">{{entry.user.first_name}}</p>
        <p mat-line class="mat-card-subtitle">{{entry.conversation.messages[0]?.message}}</p>
      </mat-list-item>
    </mat-list>
  `
})
export class ContactsComponent {

  userByConversation: { conversation: Conversation, user: User }[];

  @Output()
  selected: EventEmitter<Conversation> = new EventEmitter<Conversation>();

  constructor(
    private happnService: HappnService,
    private currentUser: CurrentUserService,
  ) {
    happnService.getConversations()
      .subscribe(conversations => {
        this.userByConversation = conversations.map(conversation => ({
          conversation,
          user: conversation.participants.filter(p => p.user.id !== this.currentUser.userId)[0].user
        }));
        // TODO remove tmp local test
        this.selected.emit(conversations[1]);
      });
  }

}
