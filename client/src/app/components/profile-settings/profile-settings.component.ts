import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

import {
  faEye,
  faEyeSlash,
  faCheck,
  faXmark
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent {
  // font awesome icons
  public faEye = faEye;
  public faEyeSlash = faEyeSlash;
  public faCheck = faCheck;
  public faXmark = faXmark;

  // password input type
  public passwordInputType: 'password' | 'text' = 'password'

  // logged user's name
  public user$ = this.authService.user$;

  // create change password form
  public changePasswordForm = new FormGroup({
    passwordInput: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100),
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)\S*$/)
    ])
  });

  constructor(
    private authService: AuthService,
  ) {}

  // toggle show password method
  showPassword() {
    this.passwordInputType === 'password' ? this.passwordInputType = 'text' : this.passwordInputType = 'password';
  }
  
  submit() {
    const pInput = this.changePasswordForm.value.passwordInput;

    if (pInput !== null && pInput !== undefined) this.authService.changePassword(pInput).subscribe(
      () => this.changePasswordForm.setValue({ passwordInput: '' })
    );
  }
}
