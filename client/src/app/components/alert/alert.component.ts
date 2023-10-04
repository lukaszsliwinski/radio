import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  public shown$ = this.alertService.shown$;
  public message$ = this.alertService.message$;

  constructor(private alertService: AlertService) {}
}
