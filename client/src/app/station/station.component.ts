import { Component, Input } from '@angular/core';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent {
  constructor(public playerService: PlayerService) { }

  @Input()
  name: string;

  @Input()
  url: string;

  @Input()
  favicon: string;

  @Input()
  country: string;
}
