import assign from 'lodash-es/assign';
export class Image {
  public id: number;
  public productId: number;

  public original: string;

  public xsmall: string;
  public small: string;
  public medium: string;
  public large: string;

  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(values?: object) {
    assign(this, values);
  }

  public static PLACEHOLDER = {
    original: 'https://via.placeholder.com/1000',
    xsmall: 'https://via.placeholder.com/100',
    small: 'https://via.placeholder.com/200',
    medium: 'https://via.placeholder.com/500',
    large: 'https://via.placeholder.com/800',
  };
}
