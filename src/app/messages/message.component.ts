import {Component, Input} from '@angular/core';

// http://nicolasgallagher.com/pure-css-speech-bubbles/demo
// https://leaverou.github.io/bubbly
@Component({
  selector: 'app-message',
  template: `
    <div
      class="message"
      [ngClass]="{'sent': sent, 'received': !sent}"
      [fxLayout]="sent ? 'row' : 'row-reverse'">
      <img [src]="avatar" class="avatar" fxFlexAlign="end">
      <div class="date-bubble" fxLayout="column">
        <small class="date">{{date | date: 'short'}}</small>
        <div class="bubble">{{content}}</div>
      </div>
    </div>
  `,
  styles: [`
    .message {
      margin-top: 10px;
      margin-bottom: 10px;
    }

    .date-bubble {
      margin-left: 30px;
      margin-right: 30px;
    }

    .avatar {
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .sent .date {
      text-align: left;
    }

    .received .date {
      text-align: right;
    }

    .bubble {
      padding: 10px;
      position: relative;
      border: 5px solid;
      border-radius: 1em;
    }

    .bubble:before {
      content: "";
      position: absolute;
      bottom: 0px;
      border-style: solid;
      border-color: transparent #000000;
    }

    .sent .bubble:before {
      left: -30px;
      border-width: 15px 30px 15px 0;
    }

    .received .bubble:before {
      right: -30px;
      border-width: 15px 0 15px 30px;
    }
  `]
})
export class MessageComponent {

  @Input()
  avatar: string;

  @Input()
  content: string;

  @Input()
  date: Date;

  @Input()
  sent: boolean;

}
