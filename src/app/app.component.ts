import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-udemy-course';
  feature = 'recipe';

  onNavigate(feature: string) {
    this.feature = feature;
  }
}
