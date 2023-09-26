import { Component, OnInit } from '@angular/core';
import { StationService } from 'src/app/services/station.service';

@Component({
  selector: 'app-profile-recent',
  templateUrl: './profile-recent.component.html',
  styleUrls: ['./profile-recent.component.scss']
})
export class ProfileRecentComponent implements OnInit {
  public recentStations$ = this.stationService.recentStations$;

  constructor(
    private stationService: StationService
  ) {}

  ngOnInit() {
    this.stationService.getRecent().subscribe();
  }
}
