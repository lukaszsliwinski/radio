import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';

import { IGetUserHttpResponse } from '../models/http-response-models/get-user-http-response';
import { IRegisterHttpResponse } from '../models/http-response-models/register-http-response';
import { ILoginHttpResponse } from '../models/http-response-models/login-http-response';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = new BehaviorSubject<string | undefined>(undefined);

  public user$ = this.user.asObservable();

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private http: HttpClient
  ) { }


  setLoggedUser(username: string | undefined) {
    this.user.next(username)
  }

  getLoggedUser(): string | undefined {
    return this.user.value;
  }

  getToken(): string {
    return this.cookieService.get('TOKEN');
  }

  // get user from server
  getUser(): Observable<IGetUserHttpResponse> {
    const token = this.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
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

  register(usernameInput: string, passwordInput: string): Observable<IRegisterHttpResponse> {
    const body = {
      usernameInput: usernameInput,
      passwordInput: passwordInput
    }

    return this.http.post<IRegisterHttpResponse>('/api/register', body).pipe(
      tap((result) => {
        alert(result.message);
        this.router.navigate(['login']);
      }),
      catchError((error: HttpErrorResponse) => {
        alert(error.error.message);
        return throwError(() => error);
      })
    );
  };

  login(usernameInput: string, passwordInput: string): Observable<ILoginHttpResponse> {
    const body = {
      usernameInput: usernameInput,
      passwordInput: passwordInput
    }

    return this.http.post<ILoginHttpResponse>('/api/login', body).pipe(
      tap((result) => {
        alert(result.message);
        if (result.token) this.cookieService.set('TOKEN', result.token, { path: '/' });
        this.setLoggedUser(result.username);
        this.router.navigate(['']);
      }),
      catchError((error: HttpErrorResponse) => {
        alert(error.error.message);
        this.setLoggedUser(undefined);
        return throwError(() => error);
      })
    );
  };

  logout() {
    this.cookieService.set('TOKEN', '', { path: '/' });
    this.setLoggedUser(undefined);
    this.router.navigate(['']);
  }
}
