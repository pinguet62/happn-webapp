import {Component, Input} from '@angular/core';
import {Conversation, HappnService} from '../happn.service';

@Component({
  selector: 'app-input',
  template: `
    <form (ngSubmit)="sendMessage()" fxLayout="row" fxLayoutAlign="start center">
      <mat-form-field fxFlex="0">
        <input [(value)]="text" matInput placeholder="Your message...">
      </mat-form-field>

      <button type="submit" mat-raised-button color="primary">Send</button>
    </form>
  `
})
export class InputComponent {

  @Input()
  conversation: Conversation;

  text = '';

  constructor(private happnService: HappnService) {
  }

  sendMessage() {
    this.happnService.sendMessage(this.conversation, this.text).subscribe(() =>
      this.text = ''
    );
  }

}
