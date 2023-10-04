import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  // local parameters
  private shown = new BehaviorSubject<boolean>(false);
  private message = new BehaviorSubject<string>('');

  // global state
  public shown$ = this.shown.asObservable();
  public message$ = this.message.asObservable();

  constructor() {}

  setAlert(message: string) {
    // send data to alert and show
    this.message.next(message);
    this.shown.next(true);

    // hide alert after 4 seconds
    setTimeout(() => this.shown.next(false), 4000);
    setTimeout(() => this.message.next(''), 5000);
  }
}
