import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private shown = new BehaviorSubject<boolean>(false);
  private message = new BehaviorSubject<string>('');

  public shown$ = this.shown.asObservable();
  public message$ = this.message.asObservable();

  constructor() { }

  setAlert(message: string) {
    this.shown.next(true);
    this.message.next(message);

    setTimeout(() => this.shown.next(false), 4000);
    setTimeout(() => this.message.next(''), 5000);
  }
}
