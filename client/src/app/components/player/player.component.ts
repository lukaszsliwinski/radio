import { Component } from '@angular/core';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  name$ = this.playerService.name$;
  favicon$ = this.playerService.favicon$;
  country$ = this.playerService.country$;
  btnLabel$ = this.playerService.btnLabel$;

  constructor(public playerService: PlayerService) { }
}
