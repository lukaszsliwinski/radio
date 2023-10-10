import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';

import { AuthService } from './auth.service';
import { AlertService } from './alert.service';

import { IStation } from '../models/station';
import {
  IStationsHttpResponse,
  IAddFavouriteHttpResponse,
  ICheckFavouriteHttpResponse,
  IDeleteFavouriteHttpResponse,
  IAddRecentHttpResponse
} from '../models/http-responses';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  // local parameters
  private favStations = new BehaviorSubject<IStation[]>([]);
  private recentStations = new BehaviorSubject<IStation[]>([]);

  // global state
  public favStations$ = this.favStations.asObservable();
  public recentStations$ = this.recentStations.asObservable();

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private alertService: AlertService
  ) {}

  // search stations method
  searchStations(inputValue: string): Observable<IStationsHttpResponse> {
    const body = {
      query: inputValue
    };

    return this.http.post<IStationsHttpResponse>('/api/search', body).pipe(
      tap((result) => {
        if (result.stations.length === 0) this.alertService.setAlert('No station found.');
      }),
      catchError((error: HttpErrorResponse) => {
        this.alertService.setAlert(error.error.message);
        return throwError(() => error);
      })
    );
  }

  // check of stations is favourite for logged user
  checkFavourite(id: string): Observable<ICheckFavouriteHttpResponse> {
    const token = this.authService.getToken();

    const body = {
      id: id
    };

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http
      .post<ICheckFavouriteHttpResponse>('/api/check-favourite', body, { headers: headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
  }

  // add station to favourites
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
      Authorization: `Bearer ${token}`
    });

    return this.http
      .post<IAddFavouriteHttpResponse>('/api/add-favourite', body, { headers: headers })
      .pipe(
        tap((result) => {
          this.getFavourites().subscribe();
          this.alertService.setAlert(result.message);
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
  }

  // remove station from favourites
  deleteFavourite(id: string): Observable<IDeleteFavouriteHttpResponse> {
    const token = this.authService.getToken();

    const body = {
      id: id
    };

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http
      .post<IDeleteFavouriteHttpResponse>('/api/delete-favourite', body, { headers: headers })
      .pipe(
        tap((result) => {
          this.getFavourites().subscribe();
          this.alertService.setAlert(result.message);
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
  }

  // get list of favourite stations for logged user
  getFavourites(): Observable<IStationsHttpResponse> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<IStationsHttpResponse>('/api/get-favourites', { headers: headers }).pipe(
      tap((result) => this.favStations.next(result.stations)),
      catchError((error: HttpErrorResponse) => {
        this.alertService.setAlert(error.error.message);
        return throwError(() => error);
      })
    );
  }

  // add station recently played list for logged user when station is played
  addRecent(station: IStation): Observable<IAddRecentHttpResponse> {
    const token = this.authService.getToken();

    const body = {
      id: station.id,
      name: station.name,
      url: station.url,
      favicon: station.favicon,
      country: station.country
    };

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http
      .post<IAddRecentHttpResponse>('/api/add-recent', body, { headers: headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
  }

  // get list of recently played stations for logged user
  getRecent(): Observable<IStationsHttpResponse> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<IStationsHttpResponse>('/api/get-recent', { headers: headers }).pipe(
      tap((result) => this.recentStations.next(result.stations)),
      catchError((error: HttpErrorResponse) => {
        this.alertService.setAlert(error.error.message);
        return throwError(() => error);
      })
    );
  }

  replaceIcon(event: Event) {
    (event.target as HTMLImageElement).src = '/api/img/default-radio-icon';
  }
}
