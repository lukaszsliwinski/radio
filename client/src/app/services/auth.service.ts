import { Injectable } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logged = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<string>('');

  public logged$ = this.logged.asObservable();
  public user$ = this.user.asObservable();

  constructor(
    private router: Router,
    private cookieService: CookieService,
  ) { }

  getUser() {
    const token = this.cookieService.get('TOKEN');
    if (token !== '') {
      axios
        .get(
          '/api/get-user',
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        )
        .then((result) => {
          this.user.next(result.data.user.username);
          this.logged.next(true);
        })
        .catch((error) => {
          console.log(error);
          this.user.next('');
          this.logged.next(false);
        })
    }
  }

  register(usernameInput: string, passwordInput: string) {
    axios
      .post(
        '/api/register',
        {
          usernameInput: usernameInput,
          passwordInput: passwordInput
        })
      .then((result) => {
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
      .then((result) => {
        alert(result.data.message);
        this.cookieService.set('TOKEN', result.data.token, {path: '/'});
        this.user.next(result.data.username);
        this.logged.next(true);
        this.router.navigate(['']);
      })
      .catch(error => {
        alert(error.response.data.message);
        this.user.next('');
        this.logged.next(false);
      });
  };

  logout() {
    this.cookieService.set('TOKEN', '', {path: '/'});
    this.user.next('');
    this.logged.next(false);
    this.router.navigate(['']);
  }
}
