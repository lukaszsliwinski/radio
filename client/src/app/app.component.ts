import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

import {
  faRadio,
  faRightToBracket,
  faUserPlus,
  faUser,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public faRadio = faRadio;
  public faRightToBracket = faRightToBracket
  public faUserPlus = faUserPlus
  public faUser = faUser
  public faRightFromBracket = faRightFromBracket

  public user$ = this.authService.user$;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    const token = this.authService.getToken();
    if (token) this.authService.getUser().subscribe();
  }
}
