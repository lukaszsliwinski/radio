import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    standalone: false
})
export class AlertComponent {
  public shown$ = this.alertService.shown$;
  public message$ = this.alertService.message$;
  public type$ = this.alertService.type$;

  constructor(private alertService: AlertService) {}
}
