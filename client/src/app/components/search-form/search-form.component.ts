import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StationService } from '../../services/station.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  constructor(public stationService: StationService) {}

  searchForm = new FormGroup({
    searchInput: new FormControl('', Validators.required)
  });

  submit() {
    const input = this.searchForm.value.searchInput;
    if (input !== null && input !== undefined) this.stationService.searchStations(input);
  }
}
