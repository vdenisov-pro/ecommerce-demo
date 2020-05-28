import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Order } from 'src/app/@core/models/order.model';

import { Subscription } from 'rxjs';

import get from 'lodash-es/get';


@Component({
  selector: 'sp-orders-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class OrdersItemComponent implements OnInit, OnDestroy {
  public action: string;
  public orderId: number;

  public source: Order;
  public isDataLoaded: boolean = false;
  public isSpinnerDisplayed: boolean = true;

  public routeChangesSub: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.routeChangesSub = this.activatedRoute.params.subscribe(params => {
      this.action = this.router.url.split('/').pop();
      this.orderId = get(params, 'id');
    });
  }

  ngOnDestroy(): void {
    !!this.routeChangesSub && this.routeChangesSub.unsubscribe();
  }

  public onCreateOrder(event) {
    this.orderId = event;
  }
}
