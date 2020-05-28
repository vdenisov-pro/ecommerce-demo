import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { Order } from 'src/app/@core/models/order.model';


@Component({
  templateUrl: './render-company.component.html',
  styleUrls: ['./render-company.component.scss']
})
export class OrdersRenderCompanyComponent implements ViewCell, OnInit {
  public companyName;

  @Input() value: string | number;
  @Input() rowData: Order;

  ngOnInit() {
    this.companyName = this.rowData.company.name;
  }
}
