import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private name = new BehaviorSubject<string>('');
  private favicon = new BehaviorSubject<string>('');
  private country = new BehaviorSubject<string>('');
  private btnLabel = new BehaviorSubject<string>('play');
  private isDisabled = new BehaviorSubject<boolean>(true);
  private loading = new BehaviorSubject<boolean>(false);

  private audioObj = new Audio();

  public name$ = this.name.asObservable();
  public favicon$ = this.favicon.asObservable();
  public country$ = this.country.asObservable();
  public btnLabel$ = this.btnLabel.asObservable();
  public isDisabled$ = this.isDisabled.asObservable();
  public loading$ = this.loading.asObservable();

  constructor() { }

  loadAndPlay(url: string, name: string, favicon: string, country: string) {
    if (!this.loading.value) {
      this.loading.next(true);
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play().then(() => {
        this.name.next(name);
        this.favicon.next(favicon);
        this.country.next(country);
        this.btnLabel.next('pause');
        this.isDisabled.next(false);
        this.loading.next(false);
      });
    }
  };

  togglePlay() {
    if (this.audioObj.src) {
      if (this.audioObj.paused) {
        this.audioObj.play();
        this.btnLabel.next('pause');
      } else {
        this.audioObj.pause();
        this.btnLabel.next('play');
      }
    }
  }
}
