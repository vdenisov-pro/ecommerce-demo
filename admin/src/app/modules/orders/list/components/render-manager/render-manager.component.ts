import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { Order } from 'src/app/@core/models/order.model';


@Component({
  templateUrl: './render-manager.component.html',
  styleUrls: ['./render-manager.component.scss']
})
export class OrdersRenderManagerComponent implements ViewCell, OnInit {
  public managerName;

  @Input() value: string | number;
  @Input() rowData: Order;

  ngOnInit() {
    this.managerName = this.rowData.manager.name;
  }
}
