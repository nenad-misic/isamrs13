/* tslint:disable */

declare var Object: any;
export interface HPriceListItemInterface {
  "name": string;
  "price": number;
  "discount": number;
  "id"?: any;
  "hPriceListId"?: any;
  "mRoomReservationId"?: any;
}

export class HPriceListItem implements HPriceListItemInterface {
  "name": string;
  "price": number;
  "discount": number;
  "id": any;
  "hPriceListId": any;
  "mRoomReservationId": any;
  constructor(data?: HPriceListItemInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `HPriceListItem`.
   */
  public static getModelName() {
    return "HPriceListItem";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of HPriceListItem for dynamic purposes.
  **/
  public static factory(data: HPriceListItemInterface): HPriceListItem{
    return new HPriceListItem(data);
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
      name: 'HPriceListItem',
      plural: 'HPriceListItems',
      path: 'HPriceListItems',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "price": {
          name: 'price',
          type: 'number'
        },
        "discount": {
          name: 'discount',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "hPriceListId": {
          name: 'hPriceListId',
          type: 'any'
        },
        "mRoomReservationId": {
          name: 'mRoomReservationId',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
