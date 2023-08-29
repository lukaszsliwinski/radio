import { Injectable } from '@angular/core';
import axios from 'axios';
import { Station } from '../station';

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
      .then(result => {
        if (result.data.status === 503) {
          alert(result.data.message);
        } else {
          this.stations = result.data.stations
        }
      })
      .catch(error => {
        console.log(error);
      })
    } else {
      this.stations = [];
    }
  }
}
