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
import {MatListModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ParseIsoDatePipe} from './parseDate.pipe';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FlexLayoutModule,
    MatListModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    ParseIsoDatePipe,
    ContactsComponent,
    MessagesComponent,
    MessageComponent,
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
