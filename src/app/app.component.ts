import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(protected authService: AuthService) {
  }

  ngOnInit() {
    const niz = ['1', '2', '3'];
    niz.find(num => {
      console.log(num);
      if (num === '3') {
        return true;
      }
      return false;
    });
    this.authService.autoLogin();
  }
}
