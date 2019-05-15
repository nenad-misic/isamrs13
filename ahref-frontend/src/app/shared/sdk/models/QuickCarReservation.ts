/* tslint:disable */
import {
  MCarReservation,
  Car
} from '../index';

declare var Object: any;
export interface QuickCarReservationInterface {
  "id"?: any;
  "mCarReservationId"?: any;
  "carId"?: any;
  mCarReservation?: MCarReservation;
  car?: Car;
}

export class QuickCarReservation implements QuickCarReservationInterface {
  "id": any;
  "mCarReservationId": any;
  "carId": any;
  mCarReservation: MCarReservation;
  car: Car;
  constructor(data?: QuickCarReservationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `QuickCarReservation`.
   */
  public static getModelName() {
    return "QuickCarReservation";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of QuickCarReservation for dynamic purposes.
  **/
  public static factory(data: QuickCarReservationInterface): QuickCarReservation{
    return new QuickCarReservation(data);
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
      name: 'QuickCarReservation',
      plural: 'QuickCarReservations',
      path: 'QuickCarReservations',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "mCarReservationId": {
          name: 'mCarReservationId',
          type: 'any'
        },
        "carId": {
          name: 'carId',
          type: 'any'
        },
      },
      relations: {
        mCarReservation: {
          name: 'mCarReservation',
          type: 'MCarReservation',
          model: 'MCarReservation',
          relationType: 'belongsTo',
                  keyFrom: 'mCarReservationId',
          keyTo: 'id'
        },
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
