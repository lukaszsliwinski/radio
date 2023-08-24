import { Component } from '@angular/core';
import { AudioService } from '../audio.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  constructor(public audioService: AudioService) { }
}
