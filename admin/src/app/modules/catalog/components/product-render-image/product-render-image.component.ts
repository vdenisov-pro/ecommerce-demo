import { Component, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

import { Product } from 'src/app/@core/models/product.model';


@Component({
  templateUrl: './product-render-image.component.html',
  styleUrls: ['./product-render-image.component.scss']
})
export class ProductRenderImageComponent implements ViewCell {
  @Input() value: string | number;
  @Input() rowData: Product;

  constructor () {}
}
