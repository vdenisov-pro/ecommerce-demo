import { Pipe, PipeTransform } from '@angular/core';
import { Address } from 'src/app/@core/models/address.model';

@Pipe({
  name: 'formatAddress'
})
export class FormatAddressPipe implements PipeTransform {

  transform(address: Address): any {
    if (!address) return '';

    return `${address.country}, ${address.city}, ул.${address.street}, д.${address.house}`;
  }

}
