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
  private token = this.getToken();

  public logged$ = this.logged.asObservable();
  constructor(
    private router: Router,
    private cookieService: CookieService,
  ) {
    if (this.token !== '') {
      this.logged.next(true);
    }
    console.log('handle auth constructor')
    console.log('logged: ', this.logged.value);
    console.log('token: ', this.logged.value);
  }

  getToken() {
    return this.cookieService.get('TOKEN');
  };

  getUser() {
    axios
      .get(
        '/api/get-user',
        {
          headers: {
            'Authorization': `Bearer ${this.getUser()}`
          }
        }
      )
      .then((result) => {
        console.log('username: ', result.data.user.username);
        return result.data.user.username;
      })
      .catch((error) => {
        console.log(error);
      })
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
        // console.log(result);
        alert(result.data.message);
        this.router.navigate(['login']);
      })
      .catch(error => {
        // console.log(error);
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
        // console.log(result);
        alert(result.data.message);
        this.cookieService.set('TOKEN', result.data.token, {path: '/'});
        this.router.navigate(['']);
      })
      .catch(error => {
        // console.log(error);
        alert(error.response.data.message);
      });
  };
}
