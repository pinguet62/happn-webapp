import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ContactListComponent} from './messages/contact-list.component';
import {MessageListMessageComponent} from './messages/message-list-message.component';
import {MessageListComponent} from './messages/message-list.component';
import {ProfileComponent} from './profile/profile.component';
import {HappnService} from './happn.service';
import {CurrentUserService} from './login/currentUser.service';
import {HttpClientModule} from '@angular/common/http';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ParseIsoDatePipe} from './shared/parseDate.pipe';
import {InputComponent} from './messages/input.component';
import {ConversationComponent} from './messages/conversation.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {RouterOutletComponent} from './shared/router-outlet.component';
import {RouterModule} from '@angular/router';
import {routes} from './app-routing';
import {LoginPageComponent} from './login/login-page.component';
import {TimelinePageComponent} from './timeline/timeline-page.component';
import {MessagesPageComponent} from './messages/messages-page.component';
import {LoginGuard} from './login/login.guard';
import {LayoutComponent} from './layout.component';
import {MessageListHeaderComponent} from './messages/message-list-header.component';
import {LoginService} from './login/login.service';
import {GoogleMapsComponent} from './profile/google-maps.component';
import {MeComponent} from './me/me.component';
import {refreshTokenProvider} from './login/refresh-token-initializer';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    // lib
    MatListModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatCardModule,
    NgbModule.forRoot(),
    // app
    RouterModule.forRoot(routes),
  ],
  declarations: [
    RouterOutletComponent,
    AppComponent,
    LayoutComponent,
    ParseIsoDatePipe,
    LoginPageComponent,
    TimelinePageComponent,
    MessagesPageComponent,
    ContactListComponent,
    ConversationComponent,
    MessageListComponent,
    MessageListHeaderComponent,
    MessageListMessageComponent,
    InputComponent,
    ProfileComponent,
    GoogleMapsComponent,
    MeComponent,
  ],
  providers: [
    refreshTokenProvider,
    CurrentUserService,
    LoginService,
    HappnService,
    LoginGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
