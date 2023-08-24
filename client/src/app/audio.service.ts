import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  source: string = '';

  constructor() { }

  loadSource(url: string) {
    this.source = url;
  };
}
