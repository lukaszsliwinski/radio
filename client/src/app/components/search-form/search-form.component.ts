import { Component } from '@angular/core';
import { StationService } from '../../services/station.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  constructor(public stationService: StationService) {}
}
