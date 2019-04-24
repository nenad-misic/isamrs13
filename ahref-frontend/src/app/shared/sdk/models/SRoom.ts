/* tslint:disable */

declare var Object: any;
export interface SRoomInterface {
  "mongoId": string;
  "id"?: number;
}

export class SRoom implements SRoomInterface {
  "mongoId": string;
  "id": number;
  constructor(data?: SRoomInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `SRoom`.
   */
  public static getModelName() {
    return "SRoom";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of SRoom for dynamic purposes.
  **/
  public static factory(data: SRoomInterface): SRoom{
    return new SRoom(data);
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
      name: 'SRoom',
      plural: 'SRooms',
      path: 'SRooms',
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
