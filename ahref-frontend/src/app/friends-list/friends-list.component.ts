import {Component, Inject, OnInit} from '@angular/core';
import {FriendshipApi, LoggedUserApi} from '../shared/sdk/services/custom';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Friendship, LoggedUser, LoopBackConfig, User} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {
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

  deleteUser(id: any) {
    this.friendship.find({include: ['startUser','endUser']}).subscribe((friendship: Friendship[])=> {
      friendship.forEach((frend)=>{
        if((frend.startUserId === id && frend.endUserId === this.userApi.getCachedCurrent().id) || (frend.endUserId === id && frend.startUserId === this.userApi.getCachedCurrent().id)){
          this.friendship.deleteById(frend.id).subscribe(()=> console.log('Deleted'));
          this.location.back();
        }

      })
    });
  }
}
