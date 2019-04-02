/* tslint:disable */

declare var Object: any;
export interface RPriceListItemInterface {
  "price": number;
  "carType": string;
  "id"?: number;
  "rPriceListId"?: number;
}

export class RPriceListItem implements RPriceListItemInterface {
  "price": number;
  "carType": string;
  "id": number;
  "rPriceListId": number;
  constructor(data?: RPriceListItemInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RPriceListItem`.
   */
  public static getModelName() {
    return "RPriceListItem";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RPriceListItem for dynamic purposes.
  **/
  public static factory(data: RPriceListItemInterface): RPriceListItem{
    return new RPriceListItem(data);
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
      name: 'RPriceListItem',
      plural: 'RPriceListItems',
      path: 'RPriceListItems',
      idName: 'id',
      properties: {
        "price": {
          name: 'price',
          type: 'number'
        },
        "carType": {
          name: 'carType',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "rPriceListId": {
          name: 'rPriceListId',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
