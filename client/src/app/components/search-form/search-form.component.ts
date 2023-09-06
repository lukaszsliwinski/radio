import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StationService } from '../../services/station.service';
import { IStation } from 'src/app/models/station';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  public stations: IStation[] = [];

  constructor(public stationService: StationService) {}

  searchForm = new FormGroup({
    searchInput: new FormControl('', Validators.required)
  });

  submit(): void {
    const input = this.searchForm.value.searchInput;
    if (input !== null && input !== undefined && input !== '') {
      this.stationService.searchStations(input)
        .subscribe((result) => {
          if (result.stations) this.stations = result.stations;
        });
    };
  }
}
