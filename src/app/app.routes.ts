import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CanDeactivateGuard } from './can-deactivate.guard';

// Define routes
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
    loadComponent: () => import('./components/thank-you/thank-you.component').then(mod => mod.ThankYouComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./components/login-signup/login-signup.component').then(mod => mod.LoginSignupComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then(mod => mod.HomeComponent),
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard] // Prevents going back


  },
  {
    path: 'auth/callback',
    loadComponent: () => import('./components/auth-callback/auth-callback.component').then(mod => mod.AuthCallbackComponent),
     canActivate: [AuthGuard],

  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}