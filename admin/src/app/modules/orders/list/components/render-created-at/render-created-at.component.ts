import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { Order } from 'src/app/@core/models/order.model';


@Component({
  templateUrl: './render-created-at.component.html',
  styleUrls: ['./render-created-at.component.scss']
})
export class OrdersRenderCreatedAtComponent implements ViewCell, OnInit {
  public createdAt;

  @Input() value: string | number;
  @Input() rowData: Order;

  ngOnInit() {
    this.createdAt = this.rowData.createdAt;
  }
}
