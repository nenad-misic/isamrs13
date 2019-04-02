/* tslint:disable */

declare var Object: any;
export interface DatePriceInterface {
  "price": number;
  "startDate": number;
  "id"?: number;
  "roomId"?: number;
}

export class DatePrice implements DatePriceInterface {
  "price": number;
  "startDate": number;
  "id": number;
  "roomId": number;
  constructor(data?: DatePriceInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `DatePrice`.
   */
  public static getModelName() {
    return "DatePrice";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of DatePrice for dynamic purposes.
  **/
  public static factory(data: DatePriceInterface): DatePrice{
    return new DatePrice(data);
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
      name: 'DatePrice',
      plural: 'DatePrices',
      path: 'DatePrices',
      idName: 'id',
      properties: {
        "price": {
          name: 'price',
          type: 'number'
        },
        "startDate": {
          name: 'startDate',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "roomId": {
          name: 'roomId',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
