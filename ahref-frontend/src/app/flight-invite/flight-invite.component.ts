import {Component, Inject, OnInit} from '@angular/core';
import {Flight, Friendship, LoggedUser} from '../shared/sdk/models';
import {FlightApi, FriendshipApi, LoggedUserApi} from '../shared/sdk/services/custom';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Component({
  selector: 'app-flight-invite',
  templateUrl: './flight-invite.component.html',
  styleUrls: ['./flight-invite.component.scss']
})
export class FlightInviteComponent implements OnInit {
  users: LoggedUser[];
  flight: Flight;
  constructor(private userApi: LoggedUserApi,
              private route: ActivatedRoute,
              private location: Location,
              private friendship: FriendshipApi,
              private flightApi: FlightApi,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {

    const id = this.route.snapshot.params['id'];
    this.flightApi.findOne({where: {id:id}}).subscribe((flight: Flight)=>{
      this.flight = JSON.parse(JSON.stringify(flight));
    });

    this.users = [];
    this.friendship.find({include: ['startUser','endUser']}).subscribe((searchParam: Friendship[])=>{
      searchParam.forEach((friendship)=>{
        if(friendship.startUserId === this.userApi.getCachedCurrent().id && friendship.accepted){
          this.users.push(friendship.endUser);
        }else if(friendship.endUserId === this.userApi.getCachedCurrent().id && friendship.accepted){
          this.users.push(friendship.startUser);
        }
      });
    });

  }

}

