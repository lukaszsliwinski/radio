import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StationService } from 'src/app/services/station.service';
import { IStation } from 'src/app/models/station';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public stations: IStation[] = [];

  constructor(
    public authService: AuthService,
    public stationService: StationService
  ) {}

  ngOnInit() {
    this.renderStations();
  }

  renderStations() {
    this.stationService.getFavourites()
      .subscribe((result) => {
        console.log('tu: ', result);
        if (result.stations) this.stations = result.stations;
      });
  }
}
