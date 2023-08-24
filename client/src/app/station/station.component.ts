import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent {
  @Input()
  name: string;

  @Input()
  url: string;

  @Input()
  favicon: string;

  @Input()
  country: string;
}
