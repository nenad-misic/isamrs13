import {Component, Inject, OnInit} from '@angular/core';
import {Friendship, LoggedUser, User} from '../shared/sdk/models';
import {FriendshipApi, LoggedUserApi} from '../shared/sdk/services/custom';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';
import {WsFriendsService} from '../services/ws-friends.service';

@Component({
  selector: 'app-users-detail-profile',
  templateUrl: './users-detail-profile.component.html',
  styleUrls: ['./users-detail-profile.component.scss']
})
export class UsersDetailProfileComponent implements OnInit {

  profile_new: LoggedUser;
  friends: Friendship;
  add: boolean = true;

  constructor(private userApi: LoggedUserApi,
              private route: ActivatedRoute,
              private wsService: WsFriendsService,
              private location: Location,
              private friendship: FriendshipApi,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    this.add = this.userApi.getCachedCurrent().type == 'regUser';
    const id = this.route.snapshot.params['id'];
    this.userApi.findOne({where: {id:id}}).subscribe((user: User)=> {
      this.profile_new = JSON.parse(JSON.stringify(user));
    });

    this.friendship.find().subscribe((friendships: Friendship[])=>{
      friendships.forEach((frnz)=>{
        if((frnz.endUserId === id && frnz.startUserId===this.userApi.getCachedCurrent().id) || (frnz.startUserId === id && frnz.endUserId===this.userApi.getCachedCurrent().id)){
          this.add = false;
        }
      });
    });
  }


  addFriend() {
    this.friends = new Friendship();
    this.friends.startUserId = this.userApi.getCachedCurrent().id;
    this.friends.endUserId = this.profile_new.id;
    this.friends.accepted = false;

    this.friendship.create(this.friends).subscribe((friends) => {
      console.log('Success');
      this.wsService.sendMessage(this.profile_new.id);
    });
  }
}
