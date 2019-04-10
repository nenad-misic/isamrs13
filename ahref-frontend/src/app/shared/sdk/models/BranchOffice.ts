/* tslint:disable */
import {
  RACService
} from '../index';

declare var Object: any;
export interface BranchOfficeInterface {
  "address": string;
  "id"?: any;
  "serviceId"?: any;
  "rACServiceId"?: any;
  service?: RACService;
}

export class BranchOffice implements BranchOfficeInterface {
  "address": string;
  "id": any;
  "serviceId": any;
  "rACServiceId": any;
  service: RACService;
  constructor(data?: BranchOfficeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `BranchOffice`.
   */
  public static getModelName() {
    return "BranchOffice";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of BranchOffice for dynamic purposes.
  **/
  public static factory(data: BranchOfficeInterface): BranchOffice{
    return new BranchOffice(data);
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
      name: 'BranchOffice',
      plural: 'BranchOffices',
      path: 'BranchOffices',
      idName: 'id',
      properties: {
        "address": {
          name: 'address',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "serviceId": {
          name: 'serviceId',
          type: 'any'
        },
        "rACServiceId": {
          name: 'rACServiceId',
          type: 'any'
        },
      },
      relations: {
        service: {
          name: 'service',
          type: 'RACService',
          model: 'RACService',
          relationType: 'belongsTo',
                  keyFrom: 'serviceId',
          keyTo: 'id'
        },
      }
    }
  }
}
