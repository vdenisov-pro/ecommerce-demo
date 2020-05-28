import { Company } from './company.model';
import { Manager, Client, PrivateUser } from './user.model';
import { OrderItem } from './order-item.model';
import { LegalPerson } from './legal-person.model';
import { Address } from './address.model';

import assign from 'lodash-es/assign';

export const enum OrderState {
  New = 'new',
  Verified = 'verified',
  Shipped = 'shipped',
  Delivering = 'delivering',
  Сompleted = 'completed',
  Cancelled = 'cancelled',
}

export const enum OrderStatusMode {
  Info = 'info',
  Primary = 'primary',
  Warning = 'warning',
  Success = 'success',
  Danger = 'danger',
}

export const OrderStateTitles = [
  {
    key: OrderState.New,
    value: 'новый',
    mode: OrderStatusMode.Info,
  },
  {
    key: OrderState.Verified,
    value: 'проверен',
    mode: OrderStatusMode.Primary,
  },
  {
    key: OrderState.Shipped,
    value: 'в доставке',
    mode: OrderStatusMode.Primary,
  },
  {
    key: OrderState.Delivering,
    value: 'в пути',
    mode: OrderStatusMode.Warning,
  },
  {
    key: OrderState.Сompleted,
    value: 'завершен',
    mode: OrderStatusMode.Success,
  },
  {
    key: OrderState.Cancelled,
    value: 'отменен',
    mode: OrderStatusMode.Danger,
  },
];

export const enum OrderPayment {
  Сash = 'cash',
  Noncash = 'non-cash',
  Oncredit = 'on-credit'
}

export const OrderPaymentTitles = [
  {
    key: OrderPayment.Сash,
    value: 'наличный расчет',
  },
  {
    key: OrderPayment.Noncash,
    value: 'безналичный расчет',
  },
  {
    key: OrderPayment.Oncredit,
    value: 'в долг',
  },
];

export const OrderDocumentsTitles = [
  {
    key: true,
    value: 'да',
  },
  {
    key: false,
    value: 'нет',
  },
];

class OrderData {
  id: number;

  companyId: number;
  company?: Company;

  legalPeopleId: number;
  legalPerson?: LegalPerson;

  clientId: number;
  client?: Client;

  managerId: number;
  manager?: Manager;

  authorId: number;
  author?: PrivateUser;

  addressId: number;
  address?: Address;

  // deliveredAt?: any;
  deliveryDate: Date;

  deliveryTimeMin: string;
  deliveryTimeMax: string;

  paymentMethod: OrderPayment;
  needDocuments: boolean;
  comment: string;

  status?: OrderState;
  price?: number;
  discount?: number;
  totalPrice?: number;
  code?: string;

  items?: OrderItem[];

  createdAt?: Date;
  updatedAt?: Date;
}


export class Order extends OrderData {

  static getStatus(status) {
    switch (status) {
      case OrderState.New:
        return 'новый';

      case OrderState.Verified:
        return 'проверен';

      case OrderState.Shipped:
        return 'в доставке';

      case OrderState.Delivering:
        return 'в пути';

      case OrderState.Сompleted:
        return 'завершен';

      case OrderState.Cancelled:
        return 'отменен';

      default:
        return '';
    }
  }

  static setModeByState(state?: string) {
    if (!state) { return OrderStatusMode.Info; }

    const selected = OrderStateTitles.filter(el => el.key === state)[0];

    return selected.mode;
  }

  constructor(values?: OrderData) {
    super();
    assign(this, values);
    if (!!values.author) {
      this.author = new PrivateUser(values.author);
    }
    if (!!values.company) {
      this.company = new Company(values.company);
    }
  }

  isNew() {
    return this.status === OrderState.New;
  }

  isVerified() {
    return this.status === OrderState.Verified;
  }

  isShipped() {
    return this.status === OrderState.Shipped;
  }

  isDelivering() {
    return this.status === OrderState.Delivering;
  }

  isСompleted() {
    return this.status === OrderState.Сompleted;
  }

  isCancelled() {
    return this.status === OrderState.Cancelled;
  }
}
