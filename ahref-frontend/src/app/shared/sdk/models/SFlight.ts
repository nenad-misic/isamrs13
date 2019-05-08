/* tslint:disable */
import {
  SSeat
} from '../index';

declare var Object: any;
export interface SFlightInterface {
  "mongoId": string;
  "id"?: number;
  sSeats?: SSeat[];
}

export class SFlight implements SFlightInterface {
  "mongoId": string;
  "id": number;
  sSeats: SSeat[];
  constructor(data?: SFlightInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `SFlight`.
   */
  public static getModelName() {
    return "SFlight";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of SFlight for dynamic purposes.
  **/
  public static factory(data: SFlightInterface): SFlight{
    return new SFlight(data);
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
      name: 'SFlight',
      plural: 'SFlights',
      path: 'SFlights',
      idName: 'id',
      properties: {
        "mongoId": {
          name: 'mongoId',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
        sSeats: {
          name: 'sSeats',
          type: 'SSeat[]',
          model: 'SSeat',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'sFlightId'
        },
      }
    }
  }
}
