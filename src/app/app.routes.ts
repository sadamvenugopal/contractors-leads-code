import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CanDeactivateGuard } from './can-deactivate.guard';

// Define routes
export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./components/header/header.component').then(mod => mod.HeaderComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/clientform/clientform.component').then(mod => mod.ClientformComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    loadComponent: () => import('./components/login-signup/login-signup.component').then(mod => mod.LoginSignupComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then(mod => mod.HomeComponent),
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'auth/callback',
    loadComponent: () => import('./components/auth-callback/auth-callback.component').then(mod => mod.AuthCallbackComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}