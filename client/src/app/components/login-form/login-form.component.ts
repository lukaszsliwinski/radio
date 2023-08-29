import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  constructor(public authService: AuthService) {}

  loginForm = new FormGroup({
    usernameInput: new FormControl('', Validators.required),
    passwordInput: new FormControl('', Validators.required)
  });

  submit() {
    const uInput = this.loginForm.value.usernameInput;
    const pInput = this.loginForm.value.passwordInput;

    if (uInput !== null && uInput !== undefined && pInput !== null && pInput !== undefined) this.authService.login(uInput, pInput);
  }
}
