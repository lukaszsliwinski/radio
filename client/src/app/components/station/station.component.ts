import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PlayerService } from '../../services/player.service';
import { StationService } from '../../services/station.service';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent implements OnInit {
  @Input() public id: string;
  @Input() public name: string;
  @Input() public url: string;
  @Input() public favicon: string;
  @Input() public country: string;

  public user$ = this.authService.user$;
  public fav: boolean;

  constructor(
    public authService: AuthService,
    public playerService: PlayerService,
    public stationService: StationService,
  ) { }

  ngOnInit() {
    const token = this.authService.getToken();
    if (token) this.stationService.checkFavourite(this.id).subscribe(
      result => {
        this.fav = result.fav;
      }
    )
  }

  toggleFavourite() {
    if (this.fav) {
      this.stationService.deleteFavourite(this.id).subscribe((result) => {
        if (result.status === 201) this.fav = false;
      });
    } else {
      this.stationService.addFavourite({
        id: this.id,
        name: this.name,
        url: this.url,
        favicon: this.favicon,
        country: this.country
      }).subscribe((result) => {
        if (result.status === 201) this.fav = true;
      });
    };
  }

}
