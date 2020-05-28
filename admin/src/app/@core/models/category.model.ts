import assign from 'lodash-es/assign';

export class Category {
  public id: number;
  public name: string;
  public description?: string;
  public enabled: boolean;

  public productCounter?: number = 0;

  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(values?: object) {
    assign(this, values);
  }
}
