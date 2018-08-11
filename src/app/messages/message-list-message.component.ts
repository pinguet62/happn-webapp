import {Component, Input} from '@angular/core';

// http://nicolasgallagher.com/pure-css-speech-bubbles/demo
// https://leaverou.github.io/bubbly

@Component({
  selector: 'app-message-list-message',
  template: `
    <div
      class="message"
      [ngClass]="{'sent': sent, 'received': !sent}">

      <div class="date">
        <small>{{date | date: 'short'}}</small>
      </div>

      <div class="avatar-bubble" [fxLayout]="sent ? 'row-reverse' : 'row'">
        <img [src]="avatar" class="avatar" fxFlexAlign="end">
        <div class="bubble">{{content}}</div>
      </div>
    </div>
  `,
  styles: [`
    .message {
      margin-top: 10px;
      margin-bottom: 10px;
    }

    /* ===== date ===== */

    .date {
      text-align: center;
      margin: 10px;
    }

    /* ===== avatar & bubble ===== */

    .avatar-bubble {

    }

    /* ===== bubble ===== */

    .bubble {
      padding: 10px;
      border-radius: 0.5em;
      position: relative; /* for ":before" */
    }

    .sent .bubble {
      background-color: rgb(0, 162, 216);
      margin-right: 20px;
      margin-left: 60px; /* = .avatar(width) + margin-right */
    }

    .received .bubble {
      background-color: rgb(246, 244, 239);
      margin-left: 20px;
      margin-right: 60px; /* = .avatar(width) + margin-left */
    }

    .bubble:before {
      content: "";
      position: absolute;
      bottom: 0px;
      border-style: solid;
      border-color: transparent #000000;
    }

    .received .bubble:before {
      left: -10px; /* = -1 * border-right-width */
      bottom: 15px; /* = .avatar(height)/2 - padding/2 */
      border-width: 5px 10px 5px 0;
      border-color: transparent rgb(246, 244, 239) transparent transparent;
    }

    .sent .bubble:before {
      right: -10px; /* = -1 * border-left-width */
      bottom: 15px; /* = .avatar(height)/2 - padding/2 */
      border-width: 5px 0 5px 10px;
      border-color: transparent transparent transparent rgb(0, 162, 216);
    }
  `]
})
export class MessageListMessageComponent {

  @Input()
  avatar: string;

  @Input()
  content: string;

  @Input()
  date: Date;

  @Input()
  sent: boolean;

}
