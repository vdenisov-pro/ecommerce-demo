import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { Order } from 'src/app/@core/models/order.model';


@Component({
  templateUrl: './render-delivery-date.component.html',
  styleUrls: ['./render-delivery-date.component.scss']
})
export class OrdersRenderDeliveryDateComponent implements ViewCell, OnInit {
  public deliveryDate;

  @Input() value: string | number;
  @Input() rowData: Order;

  ngOnInit() {
    this.deliveryDate = this.rowData.deliveryDate;
  }
}
