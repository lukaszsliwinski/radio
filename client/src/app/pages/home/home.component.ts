import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StationService } from '../../services/station.service';
import { IStation } from 'src/app/models/station';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public stations: IStation[] = [];

  public searchForm = new FormGroup({
    searchInput: new FormControl('', Validators.required)
  });

  constructor(public stationService: StationService) {}

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
