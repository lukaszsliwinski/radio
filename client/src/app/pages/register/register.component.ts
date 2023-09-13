import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
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

  submit() {
    const uInput = this.registerForm.value.usernameInput;
    const pInput = this.registerForm.value.passwordInput;

    if (uInput !== null && uInput !== undefined && pInput !== null && pInput !== undefined) this.authService.register(uInput, pInput).subscribe();
  }
}
