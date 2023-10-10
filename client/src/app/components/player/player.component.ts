import { Component } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { StationService } from 'src/app/services/station.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  // player properties passed from played station
  public name$ = this.playerService.name$;
  public favicon$ = this.playerService.favicon$;
  public country$ = this.playerService.country$;
  public btnLabel$ = this.playerService.btnLabel$;
  public idDisabled$ = this.playerService.isDisabled$;
  public loading$ = this.playerService.loading$;

  constructor(
    private playerService: PlayerService,
    private stationService: StationService
  ) {}

  play() {
    this.playerService.togglePlay();
  }

  handleIconError(event: Event) {
    this.stationService.replaceIcon(event);
  }
}
