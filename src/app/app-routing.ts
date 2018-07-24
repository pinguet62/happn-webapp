import {Routes} from '@angular/router';
import {RouterOutletComponent} from './shared/router-outlet.component';
import {LoginGuard} from './login/login.guard';
import {IndexComponent} from './index.component';
import {TimelinePageComponent} from './timeline/timeline-page.component';
import {MessagesPageComponent} from './messages/messages-page.component';
import {LoginPageComponent} from './login/login-page.component';

export const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'login', component: LoginPageComponent},
  {
    path: 'timeline', component: RouterOutletComponent, canActivate: [LoginGuard], children: [
      {path: '', component: TimelinePageComponent},
    ]
  },
  {
    path: 'messages', component: RouterOutletComponent, canActivate: [LoginGuard], children: [
      {path: '', component: MessagesPageComponent},
    ]
  },
];
