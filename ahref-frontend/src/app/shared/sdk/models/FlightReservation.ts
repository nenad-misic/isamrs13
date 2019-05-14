/* tslint:disable */
import {
  SSeat
} from '../index';

declare var Object: any;
export interface FlightReservationInterface {
  "timeStamp"?: Date;
  "id"?: number;
  "sSeatId"?: number;
  sSeat?: SSeat;
}

export class FlightReservation implements FlightReservationInterface {
  "timeStamp": Date;
  "id": number;
  "sSeatId": number;
  sSeat: SSeat;
  constructor(data?: FlightReservationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `FlightReservation`.
   */
  public static getModelName() {
    return "FlightReservation";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of FlightReservation for dynamic purposes.
  **/
  public static factory(data: FlightReservationInterface): FlightReservation{
    return new FlightReservation(data);
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
      name: 'FlightReservation',
      plural: 'FlightReservations',
      path: 'FlightReservations',
      idName: 'id',
      properties: {
        "timeStamp": {
          name: 'timeStamp',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "sSeatId": {
          name: 'sSeatId',
          type: 'number'
        },
      },
      relations: {
        sSeat: {
          name: 'sSeat',
          type: 'SSeat',
          model: 'SSeat',
          relationType: 'belongsTo',
                  keyFrom: 'sSeatId',
          keyTo: 'id'
        },
      }
    }
  }
}
