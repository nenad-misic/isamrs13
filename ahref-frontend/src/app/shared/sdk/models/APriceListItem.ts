/* tslint:disable */

declare var Object: any;
export interface APriceListItemInterface {
  "name": string;
  "price": number;
  "id"?: number;
  "aPriceListId"?: number;
}

export class APriceListItem implements APriceListItemInterface {
  "name": string;
  "price": number;
  "id": number;
  "aPriceListId": number;
  constructor(data?: APriceListItemInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `APriceListItem`.
   */
  public static getModelName() {
    return "APriceListItem";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of APriceListItem for dynamic purposes.
  **/
  public static factory(data: APriceListItemInterface): APriceListItem{
    return new APriceListItem(data);
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
      name: 'APriceListItem',
      plural: 'APriceListItems',
      path: 'APriceListItems',
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
        "id": {
          name: 'id',
          type: 'number'
        },
        "aPriceListId": {
          name: 'aPriceListId',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
