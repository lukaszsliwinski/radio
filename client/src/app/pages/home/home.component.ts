import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { StationService } from '../../services/station.service';
import { IStation } from 'src/app/models/station';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // font awesome icon
  public faMagnifyingGlass = faMagnifyingGlass;

  // list for found stations
  public stations: IStation[] = [];
  
  // loading state
  public isLoading = false;

  // create search station form
  public searchForm = new FormGroup({
    searchInput: new FormControl('', Validators.required)
  });

  constructor(private stationService: StationService) {}

  submit(): void {
    const input = this.searchForm.value.searchInput;
    if (input !== null && input !== undefined && input !== '') {
      this.isLoading = true; // set loading state to true
      this.stationService.searchStations(input)
      .pipe(
        finalize(() => {
          this.isLoading = false; // reset loading state after completion or error
        })
      )
      .subscribe((result) => {
        if (result.stations) this.stations = result.stations;
      });
    }
  }
}
