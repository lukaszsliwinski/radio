import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import {
  faStar,
  faClockRotateLeft,
  faGear
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  public faStar = faStar;
  public faClockRotateLeft = faClockRotateLeft;
  public faGear = faGear;

  public user$ = this.authService.user$;

  constructor(
    private authService: AuthService,
  ) {}
}
