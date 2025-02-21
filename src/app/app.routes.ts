import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./components/header/header.component').then(mod => mod.HeaderComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/clientform/clientform.component').then(mod => mod.ClientformComponent),
  },
  {
    path: 'thank-you',
    loadComponent: () => import('./components/thank-you/thank-you.component').then(mod => mod.ThankYouComponent),
  },
  {
    path: 'signup',
    loadComponent: () => import('./components/login-signup/login-signup.component').then(mod => mod.LoginSignupComponent),
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then(mod => mod.HomeComponent),
    canActivate: [AuthGuard], // Removed canDeactivate if unnecessary
  },
  {
    path: 'auth/callback',
    loadComponent: () => import('./components/auth-callback/auth-callback.component').then(mod => mod.AuthCallbackComponent),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'home', // Redirect unknown routes to home
    pathMatch: 'full',
  }
];
