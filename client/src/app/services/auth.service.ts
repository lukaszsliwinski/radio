import { Injectable } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private cookieService: CookieService  
  ) { }

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
        this.router.navigate(['']);
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
