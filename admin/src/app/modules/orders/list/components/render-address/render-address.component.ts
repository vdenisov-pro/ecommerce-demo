import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

import { Address } from 'src/app/@core/models/address.model';
import { Order } from 'src/app/@core/models/order.model';


@Component({
  templateUrl: './render-address.component.html',
  styleUrls: ['./render-address.component.scss']
})
export class OrdersRenderAddressComponent implements ViewCell, OnInit {
  public addressObj: Address;

  @Input() value: string | number;
  @Input() rowData: Order;

  ngOnInit() {
    this.addressObj = this.rowData.address;
  }
}
