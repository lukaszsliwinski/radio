import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import axios from 'axios';
import { IStation } from '../models/station';
import { IStationsHttpResponse } from '../models/stations-http-response';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  constructor(
    public authService: AuthService,
    private http: HttpClient,
  ) {}

  searchStations(inputValue: string): Observable<IStationsHttpResponse> {
    return this.http.post<IStationsHttpResponse>('/api/search', {query: inputValue})
      .pipe(
        tap(result => {
          if (result.message) {
            alert(result.message)
          }
        }),
        catchError(throwError)
      );
  };

  addFavourite(station: IStation) {
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
        if (error.response.status === 422) {
          alert(error.response.data.message)
        } else {
          console.log(error);
        }
      })
  }
}
