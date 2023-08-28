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

  private audioObj = new Audio();

  public name$ = this.name.asObservable();
  public favicon$ = this.favicon.asObservable();
  public country$ = this.country.asObservable();
  public btnLabel$ = this.btnLabel.asObservable();
  public isDisabled$ = this.isDisabled.asObservable();

  constructor() { }

  loadAndPlay(url: string, name: string, favicon: string, country: string) {
    this.audioObj.src = url;
    this.audioObj.load();
    this.audioObj.play();

    this.name.next(name);
    this.favicon.next(favicon);
    this.country.next(country);
    this.btnLabel.next('pause');
    this.isDisabled.next(false);
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
