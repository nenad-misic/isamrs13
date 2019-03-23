import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ahref-frontend';
  view: string;

  mainViewChanged(viewId: number): void {
    switch (viewId) {
      case 0: {
        this.view = 'airlines';
        break;
      }
      case 1: {
        this.view = 'hotels';
        break;
      }
      case 2: {
        this.view = 'rentacar';
        break;
      }
      case 3: {
        this.view = 'profile';
        break;
      }
      default: {
        this.view = '';
        break;
      }
    }
  }
}
