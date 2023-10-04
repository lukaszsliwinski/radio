import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileFavouritesComponent } from './components/profile-favourites/profile-favourites.component';
import { ProfileRecentComponent } from './components/profile-recent/profile-recent.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { authGuard } from './auth/auth.guard';
import { loggedGuard } from './auth/logged.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent, canActivate: [loggedGuard] }, // allow access only to not logged-in users
  { path: 'login', component: LoginComponent, canActivate: [loggedGuard] }, // allow access only to not logged-in users
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'favourites', pathMatch: 'full' },
      { path: 'favourites', component: ProfileFavouritesComponent },
      { path: 'recent', component: ProfileRecentComponent },
      { path: 'settings', component: ProfileSettingsComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
