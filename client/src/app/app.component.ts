import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public logged$ = this.authService.logged$;
  public user$ = this.authService.user$;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.setLogged();
    this.authService.getUser();
  }
}
