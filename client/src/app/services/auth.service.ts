import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import {
  IGetUserHttpResponse,
  IRegisterHttpResponse,
  ILoginHttpResponse,
  IChangePasswordHttpResponse
} from '../models/http-responses';

import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = new BehaviorSubject<string | undefined>(undefined);

  // global state
  public user$ = this.user.asObservable();

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private http: HttpClient,
    private alertService: AlertService
  ) {}

  // set logged user's name
  setLoggedUser(username: string | undefined) {
    this.user.next(username);
  }

  // get info about logged user from service
  getLoggedUser(): string | undefined {
    return this.user.value;
  }

  // get token from cookies
  getToken(): string {
    return this.cookieService.get('TOKEN');
  }

  // get user from server
  getUser(): Observable<IGetUserHttpResponse> {
    const token = this.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<IGetUserHttpResponse>('/api/get-user', { headers: headers }).pipe(
      tap((result) => this.setLoggedUser(result.username)),
      catchError((error: HttpErrorResponse) => {
        this.setLoggedUser(undefined);
        this.cookieService.set('TOKEN', '', { path: '/' });
        return throwError(() => error);
      })
    );
  }

  // register user method
  register(usernameInput: string, passwordInput: string): Observable<IRegisterHttpResponse> {
    const body = {
      usernameInput: usernameInput,
      passwordInput: passwordInput
    };

    return this.http.post<IRegisterHttpResponse>('/api/register', body).pipe(
      tap((result) => {
        this.alertService.setAlert(result.message);
        this.router.navigate(['login']);
      }),
      catchError((error: HttpErrorResponse) => {
        this.alertService.setAlert(error.error.message);
        return throwError(() => error);
      })
    );
  }

  // login method
  login(usernameInput: string, passwordInput: string): Observable<ILoginHttpResponse> {
    const body = {
      usernameInput: usernameInput,
      passwordInput: passwordInput
    };

    return this.http.post<ILoginHttpResponse>('/api/login', body).pipe(
      tap((result) => {
        this.alertService.setAlert(result.message);
        if (result.token) this.cookieService.set('TOKEN', result.token, { path: '/' });
        this.setLoggedUser(result.username);
        this.router.navigate(['']);
      }),
      catchError((error: HttpErrorResponse) => {
        this.alertService.setAlert(error.error.message);
        this.setLoggedUser(undefined);
        return throwError(() => error);
      })
    );
  }

  // logout method
  logout() {
    this.cookieService.set('TOKEN', '', { path: '/' });
    this.setLoggedUser(undefined);
    this.router.navigate(['']);
  }

  // change password method
  changePassword(passwordInput: string): Observable<IChangePasswordHttpResponse> {
    const token = this.getToken();

    const body = {
      passwordInput: passwordInput
    };

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http
      .post<IChangePasswordHttpResponse>('api/change-password', body, { headers: headers })
      .pipe(
        tap((result) => this.alertService.setAlert(result.message)),
        catchError((error: HttpErrorResponse) => {
          this.alertService.setAlert(error.error.message);
          return throwError(() => error);
        })
      );
  }
}
