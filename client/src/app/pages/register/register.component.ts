import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { faEye, faEyeSlash, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: false
})
export class RegisterComponent {
  // font awesome icons
  public faEye = faEye;
  public faEyeSlash = faEyeSlash;
  public faCheck = faCheck;
  public faXmark = faXmark;

  // password input type
  public passwordInputType: 'password' | 'text' = 'password';

  // create register form
  public registerForm = new FormGroup({
    usernameInput: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
      Validators.pattern(/^\S*$/)
    ]),
    passwordInput: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100),
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)\S*$/)
    ])
  });

  constructor(private authService: AuthService) {}

  // toggle show password method
  showPassword() {
    this.passwordInputType === 'password'
      ? (this.passwordInputType = 'text')
      : (this.passwordInputType = 'password');
  }

  submit() {
    const uInput = this.registerForm.value.usernameInput;
    const pInput = this.registerForm.value.passwordInput;

    if (uInput !== null && uInput !== undefined && pInput !== null && pInput !== undefined)
      this.authService.register(uInput, pInput).subscribe();
  }
}
