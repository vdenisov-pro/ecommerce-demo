import assign from 'lodash-es/assign';
import last from 'lodash-es/last';
import { Image } from './image.model';

export const enum ProductBoxType {
  Box = 'box',
  Package = 'package',
}

export const PRODUCT_BOX_TITLES = [
  {
    key: ProductBoxType.Box,
    value: 'коробка',
  },
  {
    key: ProductBoxType.Package,
    value: 'упаковка',
  }
];

export class Product {
  public id: number;
  public categoryId: number;

  public name: string;
  public description?: string;

  public producer: string;
  public producerCountry: string;
  public code: string;

  public images?: Image[];

  public portionNumber: number;
  public portionWeight: number;
  public portionPrice: number;

  public boxType: string;
  public boxWeight: number;
  public boxPrice: number;

  public createdAt?: Date;
  public updatedAt?: Date;

  public get lastImage() {
    return (this.images && this.images.length)
      ? last(this.images)
      : Image.PLACEHOLDER;
  }

  constructor(values?: object) {
    assign(this, values);
  }
}
