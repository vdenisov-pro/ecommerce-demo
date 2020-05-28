import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { Order } from 'src/app/@core/models/order.model';


@Component({
  templateUrl: './render-status.component.html',
  styleUrls: ['./render-status.component.scss']
})
export class OrdersRenderStatusComponent implements ViewCell, OnInit {
  public status: string;

  @Input() value: string | number;
  @Input() rowData: Order;

  ngOnInit() {
    this.status = Order.getStatus(this.value);
  }
}
