import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { Order } from 'src/app/@core/models/order.model';


@Component({
  templateUrl: './render-author.component.html',
  styleUrls: ['./render-author.component.scss']
})
export class OrdersRenderAuthorComponent implements ViewCell, OnInit {
  public authorName: string;

  @Input() value: string | number;
  @Input() rowData: Order;

  ngOnInit() {
    this.authorName = this.rowData.author.getTitle();
  }
}
