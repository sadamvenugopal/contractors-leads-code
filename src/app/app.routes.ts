import { Route } from '@angular/router';
import { ClientformComponent } from './components/clientform/clientform.component';
import { HeaderComponent } from './components/header/header.component';

// Define routes
export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./components/header/header.component').then(mod => mod.HeaderComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/clientform/clientform.component').then(mod => mod.ClientformComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./components/login-signup/login-signup.component').then(mod => mod.LoginSignupComponent)
  },

];
