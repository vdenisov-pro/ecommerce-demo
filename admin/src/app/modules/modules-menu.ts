
import { NbMenuItem } from '@nebular/theme';

// TODO; Uncomment all routes in the sidebar
export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Каталог',
    icon: 'list',
    link: '/catalog/categories',
    home: true,
    children: [
      { title: 'Категории', link: '/catalog/categories' },
    ]
  },

  {
    title: 'Пользователи',
    icon: 'people',
    link: '/users',
    children: [
      { title: 'Менеджеры', link: '/users/managers' },
      { title: 'Курьеры', link: '/users/couriers' },
      { title: 'Клиенты', link: '/users/clients' },
    ]
  },

  {
    title: 'Компании',
    icon: 'briefcase-outline',
    link: '/companies'
  },

  {
    title: 'Заказы',
    icon: 'bar-chart-2',
    link: '/orders',
    children: [
      { title: 'Все заказы', link: '/orders/list/all' },
      { title: 'Новые заказы', link: '/orders/list/new' },
      { title: 'Создать заказ', link: '/orders/create' }
    ]
  },
];
