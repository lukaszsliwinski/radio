import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PlayerService } from '../../services/player.service';
import { StationService } from '../../services/station.service';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent {
  public user$ = this.authService.user$;
  
  constructor(
    public authService: AuthService,
    public playerService: PlayerService,
    public stationService: StationService
  ) { }

  @Input()
  public id: string;

  @Input()
  public name: string;

  @Input()
  public url: string;

  @Input()
  public favicon: string;

  @Input()
  public country: string;
}