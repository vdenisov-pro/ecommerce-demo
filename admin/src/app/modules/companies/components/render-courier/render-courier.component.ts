import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

import { Address } from 'src/app/@core/models/address.model';
import { Courier } from 'src/app/@core/models/user.model';


@Component({
  templateUrl: './render-courier.component.html',
  styleUrls: ['./render-courier.component.scss']
})
export class TabAddressRenderCourierComponent implements ViewCell, OnInit {
  public courier: Courier;

  @Input() value: string | number;
  @Input() rowData: Address;

  ngOnInit() {
    this.courier = this.rowData.courier;
  }
}
