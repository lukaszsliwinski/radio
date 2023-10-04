import { Component, OnInit } from '@angular/core';
import { StationService } from 'src/app/services/station.service';

@Component({
  selector: 'app-profile-favourites',
  templateUrl: './profile-favourites.component.html',
  styleUrls: ['./profile-favourites.component.scss']
})
export class ProfileFavouritesComponent implements OnInit {
  public favStations$ = this.stationService.favStations$;

  constructor(private stationService: StationService) {}

  ngOnInit() {
    // get favourite stations list
    this.stationService.getFavourites().subscribe();
  }
}
