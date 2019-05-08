import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MFlightReservation, User} from '../shared/sdk/models';
import {EmailApi, FlightApi, LoggedUserApi, MFlightReservationApi, UserApi} from '../shared/sdk/services/custom';

@Component({
  selector: 'app-passenger-info',
  templateUrl: './passenger-info.component.html',
  styleUrls: ['./passenger-info.component.scss']
})
export class PassengerInfoComponent implements OnInit {

  users: User[] = [];
  flightId: string;
  finish : boolean = false;

  constructor(private route: ActivatedRoute,
              private flightApi : FlightApi,
              private userApi: LoggedUserApi,
              private reservations: MFlightReservationApi,
              private user: LoggedUserApi) { }

  ngOnInit() {

    this.flightId = this.route.snapshot.params['id'];
    let br=0;

    this.reservations.find({include: 'passenger'}).subscribe((reserv: MFlightReservation[])=>{
      reserv.forEach((element)=>{
        console.log('Posle reze ', element);
        if(element.flightId == this.flightId && element.userId == this.user.getCachedCurrent().id && !element.passenger.taken){

          br= br + 1;
        }
      });

      for (let i = 0; i < br; i++) {
        const usr = new User();
        usr.username = 'Username';
        usr.email = 'Email';
        usr.password = 'password';
        usr.id = "124124";
        this.users.push(usr);
      }

      this.finish = br == 0;
    });



  }


}
