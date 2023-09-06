import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';

import axios from 'axios';
import { IGetUserHttpResponse } from '../models/http-response-models/get-user-http-response';


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
    console.log('handle get user')
    const token = this.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<IGetUserHttpResponse>('/api/get-user', {headers: headers}).pipe(
      tap(result => this.setLoggedUser(result.user)),
      catchError((error: HttpErrorResponse) => {
        this.setLoggedUser(undefined);
        return throwError(() => error);
      })
    );
  }

  register(usernameInput: string, passwordInput: string) {
    axios
      .post(
        '/api/register',
        {
          usernameInput: usernameInput,
          passwordInput: passwordInput
        })
      .then(result => {
        alert(result.data.message);
        this.router.navigate(['login']);
      })
      .catch(error => {
        alert(error.response.data.message);
      });
  };

  login(usernameInput: string, passwordInput: string) {
    axios
      .post(
        '/api/login',
        {
          usernameInput: usernameInput,
          passwordInput: passwordInput
        })
      .then(result => {
        alert(result.data.message);
        this.cookieService.set('TOKEN', result.data.token, {path: '/'});
        this.setLoggedUser(result.data.username);
        this.router.navigate(['']);
      })
      .catch(error => {
        alert(error.response.data.message);
        this.setLoggedUser(undefined);
      });
  };

  logout() {
    this.cookieService.set('TOKEN', '', {path: '/'});
    this.setLoggedUser(undefined);
    this.router.navigate(['']);
  }
}
