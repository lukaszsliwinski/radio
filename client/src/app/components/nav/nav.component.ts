import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import {
  faRadio,
  faRightToBracket,
  faUserPlus,
  faUser,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  // font awesome icons
  public faRadio = faRadio;
  public faRightToBracket = faRightToBracket;
  public faUserPlus = faUserPlus;
  public faUser = faUser;
  public faRightFromBracket = faRightFromBracket;

  // logged user's name
  public user$ = this.authService.user$;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    // get logged user
    const token = this.authService.getToken();
    if (token) this.authService.getUser().subscribe();
  }
}
