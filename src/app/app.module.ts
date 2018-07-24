import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ContactsComponent} from './contacts.component';
import {MessageComponent} from './message.component';
import {MessagesComponent} from './messages.component';
import {ProfileComponent} from './profile.component';
import {HappnService} from './happn.service';
import {CurrentUserService} from './currentUser.service';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatListModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ParseIsoDatePipe} from './parseDate.pipe';
import {InputComponent} from './input.component';
import {ConversationComponent} from './conversation.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    MatListModule, MatInputModule, MatButtonModule, MatFormFieldModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    ParseIsoDatePipe,
    ContactsComponent,
    ConversationComponent,
    MessagesComponent,
    MessageComponent,
    InputComponent,
    ProfileComponent,
  ],
  providers: [
    CurrentUserService,
    HappnService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
