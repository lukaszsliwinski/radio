import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type AlertType = 'success' | 'error' | 'default';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  // local parameters
  private shown = new BehaviorSubject<boolean>(false);
  private message = new BehaviorSubject<string>('');
  private type = new BehaviorSubject<AlertType>('default');
  protected shownTimer: ReturnType<typeof setTimeout>;
  protected messageTimer: ReturnType<typeof setTimeout>;

  // global state
  public shown$ = this.shown.asObservable();
  public message$ = this.message.asObservable();
  public type$ = this.type.asObservable();

  constructor() {}

  setAlert(message: string, type: AlertType = 'default') {
    // clear timeouts if alert is already on screen
    clearTimeout(this.shownTimer);
    clearTimeout(this.messageTimer);

    // send data to alert and show
    this.message.next(message);
    this.type.next(type);
    this.shown.next(true);

    // hide alert and clear message
    this.shownTimer = setTimeout(() => {
      this.shown.next(false);
    }, 3000);

    this.messageTimer = setTimeout(() => {
      this.message.next('');
      this.type.next('default');
    }, 3500);
  }
}
