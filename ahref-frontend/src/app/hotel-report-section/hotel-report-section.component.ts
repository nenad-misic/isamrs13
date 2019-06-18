import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {HotelApi, MRoomReservationApi, RoomApi} from "../shared/sdk/services/custom";
import {Car, Hotel, MCarReservation, MRoomReservation, RACService, Room} from "../shared/sdk/models";
import {ChartDataSets, ChartOptions} from "chart.js";
import {BaseChartDirective, Color, Label} from "ng2-charts";
import {LoopBackConfig} from "../shared/sdk";
import {API_VERSION} from "../shared/baseurl";
import {Location} from "@angular/common";

@Component({
  selector: 'app-hotel-report-section',
  templateUrl: './hotel-report-section.component.html',
  styleUrls: ['./hotel-report-section.component.scss']
})
export class HotelReportSectionComponent implements OnInit {

  public roomRatings = [];

  public lineChartDataDays: ChartDataSets[];
  public lineChartDataWeeks: ChartDataSets[];
  public lineChartDataMonths: ChartDataSets[];
  public lineChartLabelsDays: Label[];
  public lineChartLabelsWeeks: Label[];
  public lineChartLabelsMonths: Label[];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  income = -1;
  startDate: Date;
  endDate: Date;
  startDateValid: string;
  endDateValid: string;
  tab = 0;

  private reservations_lastdays: MRoomReservation[] = [];
  private reservations_lastweeks: MRoomReservation[] = [];
  private reservations_lastmonths: MRoomReservation[] = [];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  hotel: Hotel;
  availableRooms = [];

  constructor(@Inject('baseURL') private baseURL,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private hotelApi: HotelApi,
              private roomApi: RoomApi,
              private location: Location,
              private mRoomReservationApi: MRoomReservationApi) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.hotelApi.findOne({where: {id: id}, include: 'rooms'}).subscribe((profile: Hotel) => {
      this.hotel = profile;
      // find all cars of this rac service
      this.roomApi.find({where: {hotelId: this.hotel.id}}).subscribe((rooms: Room[]) => {
        // count them all to see when iterating is done
        const totalCars = rooms.length;
        let cnt = 0;

        // this list will store elements that are milliseconds of begining of each day before today (12 pcs)
        const magicalListDay = [];
        const magicalListDayAdapted = [];


        const magicalListWeek = [];
        const magicalListWeekAdapted = [];

        const magicalListMonth = [];
        const magicalListMonthAdapted = [];

        // how many millis are in one day
        const dailyMillis = 1000 * 60 * 60 * 24;
        // how many millis are in one week
        const weeklyMillis = 1000 * 60 * 60 * 24 * 7;
        // how many millis are in one month
        const monthlyMillis = 1000 * 60 * 60 * 24 * 30;
        // what is current millis
        const currentMillis = new Date().getTime();

        for (let num = 0; num < 12; num++) {
          // preparing dates for calculations
          magicalListDay.push(currentMillis - (num) * dailyMillis);
          magicalListWeek.push(currentMillis - (num) * weeklyMillis);
        }

        let curMonth = new Date().getMonth();
        let curYear = new Date().getFullYear();

        const thisMonthStart = new Date(curYear, curMonth, 1).getTime();
        magicalListMonth.push(thisMonthStart);
        for (let num = 0; num < 11; num++) {
          curMonth--;
          if (curMonth < 0) {
            curMonth = 11;
            curYear--;
          }
          magicalListMonth.push(new Date(curYear, curMonth, 1).getTime());
        }

        // fix magical list to show day of the week, not millis
        for (let i = 0; i < 12; i++) {
          const dayNum = new Date(magicalListDay[i]).getDay();
          switch (dayNum) {
            case 0:
              magicalListDayAdapted[i] = 'Sunday ' +
                new Date(magicalListDay[i]).getDate() +
                '/' +
                (new Date(magicalListDay[i]).getMonth() + 1);
              break;
            case 1:
              magicalListDayAdapted[i] = 'Monday ' +
                new Date(magicalListDay[i]).getDate() +
                '/' +
                (new Date(magicalListDay[i]).getMonth() + 1);
              break;
            case 2:
              magicalListDayAdapted[i] = 'Tuesday ' +
                new Date(magicalListDay[i]).getDate() +
                '/' +
                (new Date(magicalListDay[i]).getMonth() + 1);
              break;
            case 3:
              magicalListDayAdapted[i] = 'Wednesday ' +
                new Date(magicalListDay[i]).getDate() +
                '/' +
                (new Date(magicalListDay[i]).getMonth() + 1);
              break;
            case 4:
              magicalListDayAdapted[i] = 'Thursday ' +
                new Date(magicalListDay[i]).getDate() +
                '/' +
                (new Date(magicalListDay[i]).getMonth() + 1);
              break;
            case 5:
              magicalListDayAdapted[i] = 'Friday ' +
                new Date(magicalListDay[i]).getDate() +
                '/' +
                (new Date(magicalListDay[i]).getMonth() + 1);
              break;
            case 6:
              magicalListDayAdapted[i] = 'Saturday ' +
                new Date(magicalListDay[i]).getDate() +
                '/' +
                (new Date(magicalListDay[i]).getMonth() + 1);
              break;
          }
        }

        for (let i = 0; i < 12; i++) {
          const weekStart = new Date(magicalListWeek[i]).getTime();
          const weekEnd = new Date(weekStart + 1000 * 60 * 60 * 24 * 7).getTime();

          const weekStartDate = new Date(weekStart);
          const weekEndDate = new Date(weekEnd);
          const stringDate = weekStartDate.getDate() + '/' + (weekStartDate.getMonth() + 1) + '/' + weekStartDate.getFullYear() +
            ' - ' +
            weekEndDate.getDate() + '/' + (weekEndDate.getMonth() + 1) + '/' + weekEndDate.getFullYear();
          magicalListWeekAdapted.push(stringDate);
        }

        for (let i = 0; i < 12; i++) {
          const startDate = new Date(magicalListMonth[i]).getMonth();
          let startM = '';
          switch (startDate) {
            case 0:
              startM = 'January ' + new Date(magicalListMonth[i]).getFullYear();
              break;
            case 1:
              startM = 'February ' + new Date(magicalListMonth[i]).getFullYear();
              break;
            case 2:
              startM = 'March ' + new Date(magicalListMonth[i]).getFullYear();
              break;
            case 3:
              startM = 'April ' + new Date(magicalListMonth[i]).getFullYear();
              break;
            case 4:
              startM = 'May ' + new Date(magicalListMonth[i]).getFullYear();
              break;
            case 5:
              startM = 'June ' + new Date(magicalListMonth[i]).getFullYear();
              break;
            case 6:
              startM = 'July ' + new Date(magicalListMonth[i]).getFullYear();
              break;
            case 7:
              startM = 'August ' + new Date(magicalListMonth[i]).getFullYear();
              break;
            case 8:
              startM = 'September ' + new Date(magicalListMonth[i]).getFullYear();
              break;
            case 9:
              startM = 'October ' + new Date(magicalListMonth[i]).getFullYear();
              break;
            case 10:
              startM = 'November ' + new Date(magicalListMonth[i]).getFullYear();
              break;
            case 11:
              startM = 'December ' + new Date(magicalListMonth[i]).getFullYear();
              break;
          }

          magicalListMonthAdapted.push(startM);

        }


        this.lineChartLabelsDays = magicalListDayAdapted.reverse();
        this.lineChartDataDays = [
          { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Daily income' }
        ];


        this.lineChartLabelsWeeks = magicalListWeekAdapted.reverse();
        this.lineChartDataWeeks = [
          { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Weekly income' }
        ];


        this.lineChartLabelsMonths = magicalListMonthAdapted.reverse();
        this.lineChartDataMonths = [
          { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Monthly income' }
        ];


        rooms.forEach((room) => {
          this.roomRatings.push(room);
          this.mRoomReservationApi.find({where: {roomId: room.id}}).subscribe((reservations: MRoomReservation[]) => {
            // find reservations for every fetched car
            reservations.forEach((reservation) => {
              reservation.timeStamp = new Date(reservation.timeStamp);
              if ((reservation.timeStamp.getTime() + 1000 * 60 * 60 * 24 * 12) > (new Date()).getTime()) {
                // if reservation was reserved in last 12 days, it should be shown on every chart
                this.reservations_lastdays.push(reservation);
                this.reservations_lastweeks.push(reservation);
                this.reservations_lastmonths.push(reservation);
              } else if ((reservation.timeStamp.getTime() + 1000 * 60 * 60 * 24 * 7 * 12) > (new Date()).getTime()) {
                // if reservation was reserved in last 12 weeks, it should be shown on every chart except daily
                this.reservations_lastweeks.push(reservation);
                this.reservations_lastmonths.push(reservation);
              } else if ((reservation.timeStamp.getTime() + 1000 * 60 * 60 * 24 * 365) > (new Date()).getTime()) {
                // if reservation was reserved in last 12 months (365 days) it should be shown on monthly chart only
                this.reservations_lastmonths.push(reservation);
              }
            });
            cnt++;
            // when finished iterating through cars, prepare lists for visualization
            if (cnt === totalCars) {
              // this list will store elements that are accumulated price of reservations after the certain point in time (from magicalListDay)
              const magicalPriceListDay = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
              const magicalPriceListWeek = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
              const magicalPriceListMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
              // for each reservation that happened in last 12 days
              this.reservations_lastdays.forEach((reservation) => {
                for (let i = 0; i < 12; i++) {
                  if ( reservation.timeStamp > magicalListDay[i]) {
                    // calculate magicalPriceListDay element price
                    magicalPriceListDay[i] += reservation.price;
                    break;
                  }
                }
              });

              this.reservations_lastweeks.forEach((reservation) => {
                for (let i = 0; i < 12; i++) {
                  if ( reservation.timeStamp > magicalListWeek[i]) {
                    // calculate magicalPriceListDay element price
                    magicalPriceListWeek[i] += reservation.price;
                    break;
                  }
                }
              });

              this.reservations_lastmonths.forEach((reservation) => {
                for (let i = 0; i < 12; i++) {
                  if ( reservation.timeStamp > magicalListMonth[i]) {
                    // calculate magicalPriceListDay element price
                    magicalPriceListMonth[i] += reservation.price;
                    break;
                  }
                }
              });

              // make chart go from left to right, and feed it with data
              this.lineChartLabelsDays = magicalListDayAdapted;
              this.lineChartDataDays = [
                { data: magicalPriceListDay.reverse(), label: 'Daily income' }
              ];

              this.lineChartLabelsWeeks = magicalListWeekAdapted;
              this.lineChartDataWeeks = [
                { data: magicalPriceListWeek.reverse(), label: 'Weekly income' }
              ];

              this.lineChartLabelsMonths = magicalListMonthAdapted;
              this.lineChartDataMonths = [
                { data: magicalPriceListMonth.reverse(), label: 'Monthly income' }
              ];

            }
          });
        });
      });

    });
  }

  getAvailability() {
    this.hotelApi.getAvailableRooms(this.startDate, this.endDate, this.hotel.id).subscribe((availableRooms: any) => {
      this.availableRooms = availableRooms.retval;
    })
  }

  getIncome() {
    const std = new Date(this.startDate);
    const end = new Date(this.endDate);
    if (std.getTime() > end.getTime()) {
      this.toastr.warning('Start date cannot be after end date', 'Warning!');
      this.income = -1;
    } else {
      this.income = -1;
      this.startDateValid = std.getDate() + '/' + (std.getMonth() + 1) + '/' + std.getFullYear();
      this.endDateValid = end.getDate() + '/' + (end.getMonth() + 1) + '/' + end.getFullYear();
      this.roomApi.find({where: {hotelId: this.hotel.id}}).subscribe((rooms: Room[]) => {
        rooms.forEach((room) => {
          this.mRoomReservationApi.find({where: {roomId: room.id}}).subscribe((reservations: MRoomReservation[]) => {
            reservations.forEach((reservation) => {
              const ts = new Date(reservation.timeStamp).getTime();
              if ((ts > std.getTime()) && (ts < end.getTime())) {
                this.income += reservation.price;
              }
            });
          });
        });
      });
    }
  }

  onBack() {
    this.location.back();
  }

}
