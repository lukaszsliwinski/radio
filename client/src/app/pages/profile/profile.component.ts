import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StationService } from 'src/app/services/station.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public stationService: StationService
  ) {}

  ngOnInit() {
    this.stationService.getFavourites().subscribe();
  }
}
