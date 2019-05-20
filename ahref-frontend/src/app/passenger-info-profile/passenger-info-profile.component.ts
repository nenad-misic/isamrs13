import {Component, Inject, OnInit} from '@angular/core';
import {MFlightReservation, Passenger} from '../shared/sdk/models';
import {FlightApi, LoggedUserApi, MFlightReservationApi, PassengerApi} from '../shared/sdk/services/custom';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-passenger-info-profile',
  templateUrl: './passenger-info-profile.component.html',
  styleUrls: ['./passenger-info-profile.component.scss']
})
export class PassengerInfoProfileComponent implements OnInit {

  profile: Passenger = new Passenger();
  invite : boolean = false;
  constructor(private userApi: LoggedUserApi,
              private route: ActivatedRoute,
              private location: Location,
              private flightApi: FlightApi,
              private passengerApi: PassengerApi,
              private reservation: MFlightReservationApi,
              @Inject('baseURL') private baseURL,) { }

  ngOnInit() {
    const flight = this.route.snapshot.params['flight'];

    this.reservation.find({include: 'passenger'}).subscribe((reservations: MFlightReservation[])=> {

      reservations.forEach((element) => {
        if (element.flightId === flight && element.userId === this.userApi.getCachedCurrent().id && !element.passenger.taken) {
          console.log('Ima nesto');
          this.invite = true;
        }
      });
    });

  }

  onSaveClick() {

    const flight = this.route.snapshot.params['flight'];

    this.reservation.find({include: 'passenger'}).subscribe((reservations: MFlightReservation[])=>{
      reservations.forEach((element)=>{
        if(element.flightId === flight && element.userId === this.userApi.getCachedCurrent().id && !element.passenger.taken){
          if(this.invite){
            this.passengerApi.findOne({where: {id:element.passengerId}}).subscribe((pas: Passenger)=>{

              pas.name = this.profile.name;
              pas.passport = this.profile.passport;
              pas.telephone = this.profile.telephone;
              pas.city = this.profile.city;
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

  goBack() {
    this.location.back();

  }
}
