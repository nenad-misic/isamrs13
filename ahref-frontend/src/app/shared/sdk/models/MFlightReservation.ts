/* tslint:disable */
import {
  Flight,
  Seat,
  LoggedUser,
  Passenger
} from '../index';

declare var Object: any;
export interface MFlightReservationInterface {
  "timeStamp"?: Date;
  "flightRate": number;
  "airlineRate": number;
  "id"?: any;
  "flightId"?: any;
  "seatId"?: any;
  "userId"?: any;
  "passengerId"?: any;
  "quickFlightReservationId"?: any;
  flight?: Flight;
  seat?: Seat;
  user?: LoggedUser;
  passenger?: Passenger;
}

export class MFlightReservation implements MFlightReservationInterface {
  "timeStamp": Date;
  "flightRate": number;
  "airlineRate": number;
  "id": any;
  "flightId": any;
  "seatId": any;
  "userId": any;
  "passengerId": any;
  "quickFlightReservationId": any;
  flight: Flight;
  seat: Seat;
  user: LoggedUser;
  passenger: Passenger;
  constructor(data?: MFlightReservationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `MFlightReservation`.
   */
  public static getModelName() {
    return "MFlightReservation";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of MFlightReservation for dynamic purposes.
  **/
  public static factory(data: MFlightReservationInterface): MFlightReservation{
    return new MFlightReservation(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'MFlightReservation',
      plural: 'MFlightReservations',
      path: 'MFlightReservations',
      idName: 'id',
      properties: {
        "timeStamp": {
          name: 'timeStamp',
          type: 'Date'
        },
        "flightRate": {
          name: 'flightRate',
          type: 'number',
          default: -1
        },
        "airlineRate": {
          name: 'airlineRate',
          type: 'number',
          default: -1
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "flightId": {
          name: 'flightId',
          type: 'any'
        },
        "seatId": {
          name: 'seatId',
          type: 'any'
        },
        "userId": {
          name: 'userId',
          type: 'any'
        },
        "passengerId": {
          name: 'passengerId',
          type: 'any'
        },
        "quickFlightReservationId": {
          name: 'quickFlightReservationId',
          type: 'any'
        },
      },
      relations: {
        flight: {
          name: 'flight',
          type: 'Flight',
          model: 'Flight',
          relationType: 'belongsTo',
                  keyFrom: 'flightId',
          keyTo: 'id'
        },
        seat: {
          name: 'seat',
          type: 'Seat',
          model: 'Seat',
          relationType: 'belongsTo',
                  keyFrom: 'seatId',
          keyTo: 'id'
        },
        user: {
          name: 'user',
          type: 'LoggedUser',
          model: 'LoggedUser',
          relationType: 'belongsTo',
                  keyFrom: 'userId',
          keyTo: 'id'
        },
        passenger: {
          name: 'passenger',
          type: 'Passenger',
          model: 'Passenger',
          relationType: 'belongsTo',
                  keyFrom: 'passengerId',
          keyTo: 'id'
        },
      }
    }
  }
}
