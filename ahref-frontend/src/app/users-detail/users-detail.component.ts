import {Component, Inject, OnInit} from '@angular/core';
import {LoggedUser, User} from '../shared/sdk/models';
import {LoggedUserApi, UserApi} from '../shared/sdk/services/custom';
import {UserdataService} from '../services/userdata.service';
import {DataService} from '../services/data.service';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.scss']
})
export class UsersDetailComponent implements OnInit {

  username: String;
  email: String;
  searchResult: User[] = [];
  isAdmin: boolean;
  selected_type: "regUser";
  types = ['', 'regUser', 'sysAdmin', 'hotelAdmin', 'racAdmin', 'airlineAdmin'];

  constructor(private userService: LoggedUserApi,
              private data: UserdataService,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    this.isAdmin = this.userService.getCachedCurrent().type != 'regUser';
  }

  doSearch(): void {
    this.searchResult = [];
    const filter: any = {};
    if (this.username) {
      filter.username = this.username;
    }
    if (this.email) {
      filter.email = this.email;
    }

    if (this.selected_type) {
      filter.type = this.selected_type;
      if (!this.isAdmin){
        filter.type = 'regUser';
      }
    }


   this.userService.find({where: filter}).subscribe((searchResult: LoggedUser[]) => {

     if('sysAdmin' !== this.userService.getCachedCurrent().type){
       searchResult.forEach((user)=>{

         if(user.username !== this.userService.getCachedCurrent().username && user.type ==='regUser'){
            this.searchResult.push(user);
         }

       });

     }else{
       searchResult.forEach((user)=>{

         if(user.type !== 'sysAdmin'){
           this.searchResult.push(user);
         }

       });

     }
     this.data.changeSearchParams(this.searchResult);
    });

  }


}
