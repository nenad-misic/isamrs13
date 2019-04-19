/* tslint:disable */
import {
  SCar
} from '../index';

declare var Object: any;
export interface CarReservationInterface {
  "timeStamp"?: Date;
  "startDate"?: Date;
  "endDate"?: Date;
  "id"?: number;
  "sCarId"?: number;
  sCar?: SCar;
}

export class CarReservation implements CarReservationInterface {
  "timeStamp": Date;
  "startDate": Date;
  "endDate": Date;
  "id": number;
  "sCarId": number;
  sCar: SCar;
  constructor(data?: CarReservationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `CarReservation`.
   */
  public static getModelName() {
    return "CarReservation";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of CarReservation for dynamic purposes.
  **/
  public static factory(data: CarReservationInterface): CarReservation{
    return new CarReservation(data);
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
      name: 'CarReservation',
      plural: 'CarReservations',
      path: 'CarReservations',
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
        "id": {
          name: 'id',
          type: 'number'
        },
        "sCarId": {
          name: 'sCarId',
          type: 'number'
        },
      },
      relations: {
        sCar: {
          name: 'sCar',
          type: 'SCar',
          model: 'SCar',
          relationType: 'belongsTo',
                  keyFrom: 'sCarId',
          keyTo: 'id'
        },
      }
    }
  }
}
