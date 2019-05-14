/* tslint:disable */

declare var Object: any;
export interface PassengerInterface {
  "name"?: string;
  "passport"?: string;
  "telephone"?: string;
  "city"?: string;
  "taken"?: boolean;
  "id"?: any;
}

export class Passenger implements PassengerInterface {
  "name": string;
  "passport": string;
  "telephone": string;
  "city": string;
  "taken": boolean;
  "id": any;
  constructor(data?: PassengerInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Passenger`.
   */
  public static getModelName() {
    return "Passenger";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Passenger for dynamic purposes.
  **/
  public static factory(data: PassengerInterface): Passenger{
    return new Passenger(data);
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
      name: 'Passenger',
      plural: 'Passengers',
      path: 'Passengers',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "passport": {
          name: 'passport',
          type: 'string'
        },
        "telephone": {
          name: 'telephone',
          type: 'string'
        },
        "city": {
          name: 'city',
          type: 'string'
        },
        "taken": {
          name: 'taken',
          type: 'boolean'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
