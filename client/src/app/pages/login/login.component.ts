import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import {
  faEye,
  faEyeSlash
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public faEye = faEye;
  public faEyeSlash = faEyeSlash;

  public passwordInputType: 'password' | 'text' = 'password'

  public loginForm = new FormGroup({
    usernameInput: new FormControl('', Validators.required),
    passwordInput: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService) {}

  showPassword() {
    this.passwordInputType === 'password' ? this.passwordInputType = 'text' : this.passwordInputType = 'password';
  }

  submit() {
    const uInput = this.loginForm.value.usernameInput;
    const pInput = this.loginForm.value.passwordInput;

    if (uInput !== null && uInput !== undefined && pInput !== null && pInput !== undefined) this.authService.login(uInput, pInput).subscribe();
  }
}
