import {Component, OnInit} from '@angular/core';
import {Router, RouterEvent} from '@angular/router';
import {LoggedUserApi} from './shared/sdk/services/custom';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'ahref-frontend';


  type: string;
  profile;

  constructor(private userTypeService: LoggedUserApi,
              private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.userTypeService.getCurrent().subscribe((us) => {
        if (us) {
          this.type = us.type;
          this.profile = us;
        } else {
          this.type = '';
        }
      }, (err) => {
        this.type = '';
      });
    });
  }

  ngOnInit() {
    this.userTypeService.getCurrent().subscribe((us) => {
      if (us) {
        this.type = us.type;
        this.profile = us;
      } else {
        this.type = '';
      }
    }, (err) => {
      this.type = '';
    });
  }

}
