import { Component, Input } from '@angular/core';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent {
  constructor(public playerService: PlayerService) { }

  @Input()
  public name: string;

  @Input()
  public url: string;

  @Input()
  public favicon: string;

  @Input()
  public country: string;
}
