import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  response: string;

  constructor() { }

  searchStations(inputValue: string) {
    if (inputValue !== '') {
      axios
      .post('/api/search', {query: inputValue})
      .then(res => {
        this.response = JSON.stringify(res.data.stations);
      })
      .catch(err => {
        console.log(err);
      })
    } else {
      this.response = '';
    }
  }
}
