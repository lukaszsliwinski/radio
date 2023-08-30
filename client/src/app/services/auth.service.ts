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


  getToken() {
    return this.cookieService.get('TOKEN');
  };

  getUser() {
    console.log('handle get user')
    axios
      .get(
        '/api/get-user',
        {
          headers: {
            'Authorization': `Bearer ${this.getToken()}`
          }
        }
      )
      .then((result) => {
        console.log('username: ', result.data.user.username);
        this.user.next(result.data.user.username);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  setLogged() {
    this.logged.next(true);
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
        this.setLogged();
        this.getUser();
        this.router.navigate(['']);
      })
      .catch(error => {
        // console.log(error);
        alert(error.response.data.message);
      });
  };
}
