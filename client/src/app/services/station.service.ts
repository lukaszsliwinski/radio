import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

import { AuthService } from './auth.service';

import { IStation } from '../models/station';
import { IStationsHttpResponse } from '../models/http-response-models/stations-http-response';
import { IAddFavouriteHttpResponse } from '../models/http-response-models/add-favourite-http-response';
import { IGetFavouritesHttpResponse } from '../models/http-response-models/get-favourites-http-response';
import { ICheckFavouriteHttpResponse } from '../models/http-response-models/check-favourite-http-response';
import { IDeleteFavouriteHttpResponse } from '../models/http-response-models/delete-favourite-http-response';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  public favStations: IStation[] = [];

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
        catchError((error: HttpErrorResponse) => {
          alert(error.error.message)
          return throwError(() => error);
        })
      );
  };

  checkFavourite(id: string): Observable<ICheckFavouriteHttpResponse> {
    const token = this.authService.getToken();

    const body = {
      id: id
    };

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<ICheckFavouriteHttpResponse>('/api/check-favourite', body, { headers: headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    )
  }

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

    return this.http.post<IAddFavouriteHttpResponse>('/api/add-favourite', body, { headers: headers }).pipe(
      tap(() => this.getFavourites().subscribe()),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  };

  deleteFavourite(id: string): Observable<IDeleteFavouriteHttpResponse> {
    const token = this.authService.getToken();

    const body = {
      id: id
    };

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<IDeleteFavouriteHttpResponse>('/api/delete-favourite', body, { headers: headers }).pipe(
      tap(() => this.getFavourites().subscribe()),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    )
  }

  getFavourites(): Observable<IGetFavouritesHttpResponse> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<IGetFavouritesHttpResponse>('/api/get-favourites', { headers: headers }).pipe(
      tap((result) => this.favStations = result.stations),
      catchError((error: HttpErrorResponse) => {
        alert(error.error.message)
        return throwError(() => error);
      })
    );
  }
}
