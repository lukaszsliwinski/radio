import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

import { AuthService } from './auth.service';

import { IStation } from '../models/station';
import { IStationsHttpResponse } from '../models/http-response-models/stations-http-response';
import { IAddFavouriteHttpResponse } from '../models/http-response-models/add-favourite-http-response';


@Injectable({
  providedIn: 'root'
})
export class StationService {
  constructor(
    public authService: AuthService,
    private http: HttpClient,
  ) {}

  searchStations(inputValue: string): Observable<IStationsHttpResponse> {
    const body = {
      query: inputValue
    };

    return this.http.post<IStationsHttpResponse>('/api/search', body)
      .pipe(
        tap(result => {
          if (result.message) {
            alert(result.message)
          }
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
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
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  };
}
