import { Injectable } from '@angular/core';
import axios from 'axios';
import { Station } from './station';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  stations: Station[];

  constructor() { }

  searchStations(inputValue: string) {
    if (inputValue !== '') {
      axios
      .post('/api/search', {query: inputValue})
      .then(res => {
        this.stations = res.data.stations
      })
      .catch(err => {
        console.log(err);
      })
    } else {
      this.stations = [];
    }
  }
}
