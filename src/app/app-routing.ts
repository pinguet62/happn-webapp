import {Routes} from '@angular/router';
import {LoginGuard} from './login/login.guard';
import {TimelinePageComponent} from './timeline/timeline-page.component';
import {MessagesPageComponent} from './messages/messages-page.component';
import {LoginPageComponent} from './login/login-page.component';
import {LayoutComponent} from './layout.component';
import {ProfileComponent} from './profile/profile.component';
import {MeComponent} from './me/me.component';

export const routes: Routes = [
  {path: '', redirectTo: 'timeline', pathMatch: 'full'}, // no (yet?) index
  {path: 'login', component: LoginPageComponent},
  {
    path: '', component: LayoutComponent, canActivate: [LoginGuard], children: [
      {path: 'timeline', component: TimelinePageComponent},
      {path: 'messages', component: MessagesPageComponent},
      {path: 'profile/:id', component: ProfileComponent},
      {path: 'me', component: MeComponent},
    ]
  },
];
