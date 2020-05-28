import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Главная',
    icon: 'home',
    link: '/dashboard',
    home: true,
  },

  {
    title: 'Каталог',
    icon: 'list',
    link: '/catalog',
    children: [{ title: 'Категории', link: '/catalog/categories' }]
  },

  {
    title: 'Пользователи',
    icon: 'person',
    link: '/users',
    children: [
      { title: 'Клиенты', link: '/users/clients' },
      { title: 'Курьеры', link: '/users/couriers' },
      { title: 'Менеджеры', link: '/users/managers' }
    ]
  },

  {
    title: 'Компании',
    icon: 'bar-chart',
    link: '/companies'
  },

  {
    title: 'Заказы',
    icon: 'email',
    link: '/orders',
    children: [
      { title: 'Новые заказы', link: '/orders/new-orders' },
      { title: 'Создать заказ', link: '/orders/make-orders' }
    ]
  },

  {
    title: 'Бонусы',
    icon: 'compose',
    link: '/bonus'
  },

  {
    title: 'Остатки',
    icon: 'layout-centre',
    link: '/remains'
  },

  {
    title: 'Настройки',
    icon: 'gear',
    link: '/settings'
  }
];
