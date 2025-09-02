import { Component } from '@angular/core';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-back-home',
    templateUrl: './back-home.component.html',
    styleUrls: ['./back-home.component.scss'],
    standalone: false
})
export class BackHomeComponent {
  // font awesome icon
  public faArrowLeft = faArrowLeft;
}
