import { Component, Input } from '@angular/core';
import { AudioService } from '../audio.service';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent {
  constructor(public audioService: AudioService) { }

  @Input()
  name: string;

  @Input()
  url: string;

  @Input()
  favicon: string;

  @Input()
  country: string;
}
