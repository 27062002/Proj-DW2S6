import { Routes } from '@angular/router';
import { UserPage } from './pages/user/user-page.component';
import { ResourcePage } from './pages/resources/resources-page.component';
import { AuthorizedComponent } from './security/authorized/authorized.component';
import { AuthGuard } from './security/auth.guard';
import { HomePage } from './pages/home/home-page.component';

export const routes: Routes = [
  { path: '', component: HomePage },
  {
    path: 'users',
    component: UserPage,
    canActivate: [AuthGuard],
  },
  {
    path: 'resources',
    component: ResourcePage,
    canActivate: [AuthGuard],
  },
  { path: 'authorized', component: AuthorizedComponent },
];
