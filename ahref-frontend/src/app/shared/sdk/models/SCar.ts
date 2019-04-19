/* tslint:disable */

declare var Object: any;
export interface SCarInterface {
  "mongoId": string;
  "id"?: number;
}

export class SCar implements SCarInterface {
  "mongoId": string;
  "id": number;
  constructor(data?: SCarInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `SCar`.
   */
  public static getModelName() {
    return "SCar";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of SCar for dynamic purposes.
  **/
  public static factory(data: SCarInterface): SCar{
    return new SCar(data);
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
      name: 'SCar',
      plural: 'SCars',
      path: 'SCars',
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
      }
    }
  }
}
