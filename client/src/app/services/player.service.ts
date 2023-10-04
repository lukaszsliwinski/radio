import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { StationService } from './station.service';
import { AuthService } from './auth.service';

import { IStation } from '../models/station';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  // local parameters
  private name = new BehaviorSubject<string>('');
  private favicon = new BehaviorSubject<string>('');
  private country = new BehaviorSubject<string>('');
  private url = new BehaviorSubject<string>('');
  private btnLabel = new BehaviorSubject<IconDefinition>(faPlay);
  private isDisabled = new BehaviorSubject<boolean>(true);
  private loading = new BehaviorSubject<boolean>(false);

  // create audio object
  private audioObj = new Audio();

  // global state
  public name$ = this.name.asObservable();
  public favicon$ = this.favicon.asObservable();
  public country$ = this.country.asObservable();
  public url$ = this.url.asObservable();
  public btnLabel$ = this.btnLabel.asObservable();
  public isDisabled$ = this.isDisabled.asObservable();
  public loading$ = this.loading.asObservable();

  constructor(
    private stationService: StationService,
    private authService: AuthService
  ) {}

  // load and play method (used in station component)
  loadAndPlay(station: IStation) {
    if (!this.loading.value) {
      this.loading.next(true);
      this.audioObj.src = station.url;
      this.audioObj.load();
      this.audioObj.play().then(() => {
        const token = this.authService.getToken();
        if (token) this.stationService.addRecent(station).subscribe();

        this.name.next(station.name);
        this.favicon.next(station.favicon);
        this.country.next(station.country);
        this.url.next(station.url);
        this.btnLabel.next(faPause);
        this.isDisabled.next(false);
        this.loading.next(false);
      });
    }
  }

  // toggle play method (used in player component)
  togglePlay() {
    if (this.audioObj.src) {
      if (this.audioObj.paused) {
        this.audioObj.play();
        this.btnLabel.next(faPause);
      } else {
        this.audioObj.pause();
        this.btnLabel.next(faPlay);
      }
    }
  }
}
