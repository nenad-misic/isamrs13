import {Component, Inject, Input, OnInit} from '@angular/core';
import {CarApi, DestinationApi, RACServiceApi} from '../shared/sdk/services/custom';
import {Car, LoopBackConfig, RACService} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';
import {DataService} from '../services/data.service';
import {CarReservationDataService} from '../services/car-reservation-data.service';

@Component({
  selector: 'app-rac-reservation-search-form',
  templateUrl: './rac-reservation-search-form.component.html',
  styleUrls: ['./rac-reservation-search-form.component.scss']
})
export class RacReservationSearchFormComponent implements OnInit {

  startDate: string;
  endDate: string;
  startDestination: string;
  endDestination: string;
  carType: string;
  numOfSeats: string;

  destinations;

  searchResult: Car[] = [];


  types = [];
  @Input()
  racId: string;

  constructor(private racServiceApi: RACServiceApi,
              private destinationApi: DestinationApi,
              private data: DataService,
              private carApi: CarApi,
              private infoData: CarReservationDataService,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    this.racServiceApi.findById(this.racId, {include: ['branchOffices', 'cars']}).subscribe((searchResult: RACService) => {
      console.log('init');
      this.destinations = searchResult.branchOffices;
      searchResult.cars.forEach((car: Car) => {
        if ( this.types.indexOf(car.carType) === -1 ) {
          this.types.push(car.carType);
        }
      });
    });
  }

  doSearch(): void {
    this.carApi.getMatching(
      this.racId,
      this.startDate,
      this.endDate,
      this.startDestination,
      this.endDestination,
      this.numOfSeats,
      this.carType).subscribe(
        (cars) => {
        this.searchResult = cars.retval;
        this.data.changeSearchParams(cars.retval);
      });

    this.infoData.changeSearchParams({
      startDate: this.startDate,
      endDate: this.endDate,
      startDestination: this.startDestination,
      endDestination: this.endDestination
    });
  }

}
