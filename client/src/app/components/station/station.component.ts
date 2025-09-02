import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PlayerService } from '../../services/player.service';
import { StationService } from '../../services/station.service';

import { faPlay, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

@Component({
    selector: 'app-station',
    templateUrl: './station.component.html',
    styleUrls: ['./station.component.scss'],
    standalone: false
})
export class StationComponent implements OnInit {
  // station input parameters
  @Input() public id: string;
  @Input() public name: string;
  @Input() public url: string;
  @Input() public favicon: string;
  @Input() public country: string;
  @Input() public datetime: string;

  // font awesome icons
  public faPlay = faPlay;
  public faStarSolid = faStarSolid;
  public faStarRegular = faStarRegular;

  public url$ = this.playerService.url$;
  public user$ = this.authService.user$;
  public btnLabel$ = this.playerService.btnLabel$;
  public fav: boolean;

  constructor(
    private playerService: PlayerService,
    private authService: AuthService,
    private stationService: StationService
  ) {}

  ngOnInit() {
    // check if station is favourite for this user
    const token = this.authService.getToken();
    if (token)
      this.stationService.checkFavourite(this.id).subscribe((result) => {
        this.fav = result.fav;
      });
  }

  // toggle favourite station method
  toggleFavourite() {
    if (this.fav) {
      this.stationService.deleteFavourite(this.id).subscribe((result) => {
        if (result.status === 200) this.fav = false;
      });
    } else {
      this.stationService
        .addFavourite({
          id: this.id,
          name: this.name,
          url: this.url,
          favicon: this.favicon,
          country: this.country
        })
        .subscribe((result) => {
          if (result.status === 201) this.fav = true;
        });
    }
  }

  // load station to player and play
  loadAndPlay() {
    this.playerService.loadAndPlay({
      id: this.id,
      url: this.url,
      name: this.name,
      favicon: this.favicon,
      country: this.country
    });
  }

  play() {
    this.playerService.togglePlay();
  }

  handleIconError(event: Event) {
    this.stationService.replaceIcon(event);
  }
}
