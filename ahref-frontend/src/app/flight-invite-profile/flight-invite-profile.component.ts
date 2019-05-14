import {Component, Inject, OnInit} from '@angular/core';
import {Friendship, LoggedUser, MFlightReservation, Passenger, User} from '../shared/sdk/models';
import {FriendshipApi, LoggedUserApi, MFlightReservationApi, PassengerApi} from '../shared/sdk/services/custom';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Component({
  selector: 'app-flight-invite-profile',
  templateUrl: './flight-invite-profile.component.html',
  styleUrls: ['./flight-invite-profile.component.scss']
})
export class FlightInviteProfileComponent implements OnInit {

  profile_new: LoggedUser;
  friends: Friendship;
  invite: boolean = true;

  constructor(private userApi: LoggedUserApi,
              private route: ActivatedRoute,
              private location: Location,
              private reservation: MFlightReservationApi,
              private passengerApi: PassengerApi,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.userApi.findOne({where: {id: id}}).subscribe((user: User) => {
      this.profile_new = JSON.parse(JSON.stringify(user));
    });

    const flight = this.route.snapshot.params['flight'];

    this.reservation.find().subscribe((reservations: MFlightReservation[])=> {

      reservations.forEach((element) => {
        console.log(element.userId,' - ', id);
        if (element.flightId === flight && element.userId === id) {
          console.log('Nasao sam ga vec');
          this.invite = false;
        }
      });
    });

  }


  inviteFriend() {
    const flight = this.route.snapshot.params['flight'];

      this.reservation.find({include: 'passenger'}).subscribe((reservations: MFlightReservation[])=>{
          reservations.forEach((element)=>{
            console.log(element);
            if(element.flightId === flight && element.userId === this.userApi.getCachedCurrent().id && !element.passenger.taken){
              if(this.invite){
                element.userId = this.profile_new.id;
                this.passengerApi.findOne({where: {id:element.passengerId}}).subscribe((pas: Passenger)=>{

                  pas.name = this.profile_new.name;
                  pas.passport = '1111';
                  pas.telephone = this.profile_new.telephone;
                  pas.city = this.profile_new.city;
                  pas.taken = true;

                  this.passengerApi.updateAttributes(pas.id,pas).subscribe(() => {console.log('Update pass')});
                  this.reservation.updateAttributes(element.id,element).subscribe(()=> {console.log('Updated jo')});


                });
                this.invite = false;
              }
            }
          });
      });
      this.location.back();
  }
}
