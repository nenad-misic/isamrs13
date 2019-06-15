/* tslint:disable */
import {
  Car,
  LoggedUser
} from '../index';

declare var Object: any;
export interface MCarReservationInterface {
  "timeStamp"?: Date;
  "startDate"?: Date;
  "endDate"?: Date;
  "carRate": number;
  "racRate": number;
  "sid": number;
  "price"?: number;
  "id"?: any;
  "carId"?: any;
  "loggedUserId"?: any;
  "combinedReservationId"?: any;
  car?: Car;
  loggedUser?: LoggedUser;
}

export class MCarReservation implements MCarReservationInterface {
  "timeStamp": Date;
  "startDate": Date;
  "endDate": Date;
  "carRate": number;
  "racRate": number;
  "sid": number;
  "price": number;
  "id": any;
  "carId": any;
  "loggedUserId": any;
  "combinedReservationId": any;
  car: Car;
  loggedUser: LoggedUser;
  constructor(data?: MCarReservationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `MCarReservation`.
   */
  public static getModelName() {
    return "MCarReservation";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of MCarReservation for dynamic purposes.
  **/
  public static factory(data: MCarReservationInterface): MCarReservation{
    return new MCarReservation(data);
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
      name: 'MCarReservation',
      plural: 'MCarReservations',
      path: 'MCarReservations',
      idName: 'id',
      properties: {
        "timeStamp": {
          name: 'timeStamp',
          type: 'Date'
        },
        "startDate": {
          name: 'startDate',
          type: 'Date'
        },
        "endDate": {
          name: 'endDate',
          type: 'Date'
        },
        "carRate": {
          name: 'carRate',
          type: 'number',
          default: -1
        },
        "racRate": {
          name: 'racRate',
          type: 'number',
          default: -1
        },
        "sid": {
          name: 'sid',
          type: 'number',
          default: -1
        },
        "price": {
          name: 'price',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "carId": {
          name: 'carId',
          type: 'any'
        },
        "loggedUserId": {
          name: 'loggedUserId',
          type: 'any'
        },
        "combinedReservationId": {
          name: 'combinedReservationId',
          type: 'any'
        },
      },
      relations: {
        car: {
          name: 'car',
          type: 'Car',
          model: 'Car',
          relationType: 'belongsTo',
                  keyFrom: 'carId',
          keyTo: 'id'
        },
        loggedUser: {
          name: 'loggedUser',
          type: 'LoggedUser',
          model: 'LoggedUser',
          relationType: 'belongsTo',
                  keyFrom: 'loggedUserId',
          keyTo: 'id'
        },
      }
    }
  }
}
