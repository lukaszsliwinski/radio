import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dataString: string;

  constructor() {}

  getData() {
    axios
      .get('/api/pass-data')
      .then(res => {
        this.dataString = res.data.testData;
      })
      .catch(err => {
        console.log(err);
      })
  }
}
