import {Component, OnInit} from '@angular/core';
import {Router, RouterEvent} from '@angular/router';
import {LoggedUserApi} from './shared/sdk/services/custom';
import {User} from './shared/sdk/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'ahref-frontend';

  type: string;

  constructor(private userTypeService: LoggedUserApi,
              private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      if( this.userTypeService.getCachedCurrent() ){
        this.type = this.userTypeService.getCachedCurrent().type;
      }else{
        this.type = '';
      }
    });
  }

  ngOnInit() {
    if( this.userTypeService.getCachedCurrent() ){
      this.type = this.userTypeService.getCachedCurrent().type;
    }else{
      this.type = '';
    }
  }
}
