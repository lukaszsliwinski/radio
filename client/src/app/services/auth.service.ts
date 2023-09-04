import { Injectable } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = new BehaviorSubject<string | undefined>(undefined);

  public user$ = this.user.asObservable();

  constructor(
    private router: Router,
    private cookieService: CookieService,
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
  getUser() {
    const token = this.getToken();
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
        .then(result => {
          this.setLoggedUser(result.data.user.username);
        })
        .catch(() => {
          this.setLoggedUser(undefined);
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
