import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ContactsComponent} from './messages/contacts.component';
import {MessageComponent} from './messages/message.component';
import {MessagesComponent} from './messages/messages.component';
import {ProfileComponent} from './messages/profile.component';
import {HappnService} from './happn.service';
import {CurrentUserService} from './login/currentUser.service';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatListModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ParseIsoDatePipe} from './shared/parseDate.pipe';
import {InputComponent} from './messages/input.component';
import {ConversationComponent} from './messages/conversation.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {RouterOutletComponent} from './shared/router-outlet.component';
import {IndexComponent} from './index.component';
import {RouterModule} from '@angular/router';
import {routes} from './app-routing';
import {LoginPageComponent} from './login/login-page.component';
import {TimelinePageComponent} from './timeline/timeline-page.component';
import {MessagesPageComponent} from './messages/messages-page.component';
import {LoginGuard} from './login/login.guard';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    // lib
    MatListModule, MatInputModule, MatButtonModule, MatFormFieldModule,
    NgbModule.forRoot(),
    // app
    RouterModule.forRoot(routes),
  ],
  declarations: [
    RouterOutletComponent,
    AppComponent,
    IndexComponent,
    ParseIsoDatePipe,
    LoginPageComponent,
    TimelinePageComponent,
    MessagesPageComponent,
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
    LoginGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
