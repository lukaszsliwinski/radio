import { Injectable } from '@angular/core';
import axios from 'axios';
import { Station } from '../station';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  public stations: Station[];

  constructor(public authService: AuthService) {}

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

  addFavourite(station: Station) {
    const token = this.authService.getToken();
    axios
      .post(
        '/api/add-favourite',
        {
          id: station.id,
          name: station.name,
          url: station.url,
          favicon: station.favicon,
          country: station.country
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      .then(result => {
        alert(result.data.message);
      })
      .catch(error => {
        console.log(error);
      })
  }
}
