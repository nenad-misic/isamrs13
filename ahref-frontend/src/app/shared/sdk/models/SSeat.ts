/* tslint:disable */
import {
  SFlight
} from '../index';

declare var Object: any;
export interface SSeatInterface {
  "mongoId"?: string;
  "id"?: number;
  "sFlightId"?: number;
  sFlight?: SFlight;
}

export class SSeat implements SSeatInterface {
  "mongoId": string;
  "id": number;
  "sFlightId": number;
  sFlight: SFlight;
  constructor(data?: SSeatInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `SSeat`.
   */
  public static getModelName() {
    return "SSeat";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of SSeat for dynamic purposes.
  **/
  public static factory(data: SSeatInterface): SSeat{
    return new SSeat(data);
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
      name: 'SSeat',
      plural: 'SSeats',
      path: 'SSeats',
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
        "sFlightId": {
          name: 'sFlightId',
          type: 'number'
        },
      },
      relations: {
        sFlight: {
          name: 'sFlight',
          type: 'SFlight',
          model: 'SFlight',
          relationType: 'belongsTo',
                  keyFrom: 'sFlightId',
          keyTo: 'id'
        },
      }
    }
  }
}
