import {Component, Inject, OnInit} from '@angular/core';
import {Friendship, LoggedUser} from '../shared/sdk/models';
import {FriendshipApi, LoggedUserApi} from '../shared/sdk/services/custom';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Component({
  selector: 'app-friends-list-requests',
  templateUrl: './friends-list-requests.component.html',
  styleUrls: ['./friends-list-requests.component.scss']
})
export class FriendsListRequestsComponent implements OnInit {

  users: LoggedUser[];

  constructor(private userApi: LoggedUserApi,
              private route: ActivatedRoute,
              private location: Location,
              private friendship: FriendshipApi,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {

    this.friendship.find({include: ['startUser','endUser']}).subscribe((searchParam: Friendship[])=>{
      this.users = [];
      searchParam.forEach((friendship: Friendship)=>{
        console.log('Friendship', friendship);
        console.log(friendship.endUserId, ' - ', this.userApi.getCachedCurrent().id);
        if(friendship.endUserId === this.userApi.getCachedCurrent().id && !friendship.accepted){
          console.log('Frend req je');
          this.users.push(friendship.startUser);
        }
      });
    });

  }


  acceptRequest(id: any) {
      this.friendship.find({include: ['startUser','endUser']}).subscribe((friendship: Friendship[])=> {
        friendship.forEach((frend)=>{
          if(frend.startUserId === id && frend.endUserId === this.userApi.getCachedCurrent().id){
            frend.accepted = true;
            this.friendship.updateAttributes(frend.id, frend).subscribe(()=> console.log('Updated'));
            this.location.back();
          }

        })

      });

  }

  declineRequest(id: any) {
    this.friendship.find({include: ['startUser','endUser']}).subscribe((friendship: Friendship[])=> {
      friendship.forEach((frend)=>{
        if(frend.startUserId === id && frend.endUserId === this.userApi.getCachedCurrent().id){
          this.friendship.deleteById(frend.id).subscribe(()=> console.log('Deleted'));
          this.location.back();
        }

      })
    });




  }

}
