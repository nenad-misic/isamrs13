/* tslint:disable */
import {
  Car
} from '../index';

declare var Object: any;
export interface MCarReservationInterface {
  "timeStamp"?: Date;
  "id"?: any;
  "carId"?: any;
  car?: Car;
}

export class MCarReservation implements MCarReservationInterface {
  "timeStamp": Date;
  "id": any;
  "carId": any;
  car: Car;
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
        "id": {
          name: 'id',
          type: 'any'
        },
        "carId": {
          name: 'carId',
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
      }
    }
  }
}
