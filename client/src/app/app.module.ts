import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { StationComponent } from './components/station/station.component';
import { PlayerComponent } from './components/player/player.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavComponent } from './components/nav/nav.component';
import { ProfileFavouritesComponent } from './components/profile-favourites/profile-favourites.component';
import { ProfileRecentComponent } from './components/profile-recent/profile-recent.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { AlertComponent } from './components/alert/alert.component';
import { BackHomeComponent } from './components/back-home/back-home.component';

@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        StationComponent,
        PlayerComponent,
        RegisterComponent,
        LoginComponent,
        ProfileComponent,
        NavComponent,
        ProfileFavouritesComponent,
        ProfileRecentComponent,
        ProfileSettingsComponent,
        AlertComponent,
        BackHomeComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FontAwesomeModule], providers: [CookieService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
