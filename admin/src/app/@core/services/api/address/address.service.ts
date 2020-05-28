import { Injectable } from '@angular/core';
import { BaseHttpListService } from '../../base/base-http-list.service';
import { Address } from '../../../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService extends BaseHttpListService<Address> {
  protected getPath(): string {
    return `addresses/`;
  }

  protected createInstance(data: any): Address {
    return new Address(data);
  }
}
