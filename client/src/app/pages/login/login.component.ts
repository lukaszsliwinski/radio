import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm = new FormGroup({
    usernameInput: new FormControl('', Validators.required),
    passwordInput: new FormControl('', Validators.required)
  });

  constructor(public authService: AuthService) {}

  submit() {
    const uInput = this.loginForm.value.usernameInput;
    const pInput = this.loginForm.value.passwordInput;

    if (uInput !== null && uInput !== undefined && pInput !== null && pInput !== undefined) this.authService.login(uInput, pInput).subscribe();
  }
}
