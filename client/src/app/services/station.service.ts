import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import axios from 'axios';
import { IStation } from '../models/station';
import { IStationsHttpResponse } from '../models/stations-http-response';
import { IAddFavouriteHttpResponse } from '../models/add-favourite-http-response';
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

  addFavourite(station: IStation): Observable<IAddFavouriteHttpResponse> {
    const token = this.authService.getToken();

    const body = {
      id: station.id,
      name: station.name,
      url: station.url,
      favicon: station.favicon,
      country: station.country
    };

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<IAddFavouriteHttpResponse>('/api/add-favourite', body, {headers: headers}).pipe(
      tap(result => alert(result.message)),
      catchError(throwError)
    );
  };
}
