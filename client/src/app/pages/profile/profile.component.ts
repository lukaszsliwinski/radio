import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { StationService } from 'src/app/services/station.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user$ = this.authService.user$;
  public favStations$ = this.stationService.favStations$;

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
    private stationService: StationService
  ) {}

  ngOnInit() {
    this.stationService.getFavourites().subscribe();
  }
  
  submit() {
    const pInput = this.changePasswordForm.value.passwordInput;

    if (pInput !== null && pInput !== undefined) this.authService.changePassword(pInput).subscribe(
      () => this.changePasswordForm.setValue({ passwordInput: '' })
    );
  }
}
