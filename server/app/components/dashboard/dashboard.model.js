const { DateTime } = require('luxon');
const { knex } = require('../../../lib/knex');

const getManagerRating = ({ from, to, managerId }) => knex
  .select([
    'User.id',
    'User.name',
    'User.email',
    knex.raw('COUNT("Order"."id")::INTEGER AS orders'),
    knex.raw('COALESCE(SUM("OrderItem"."productPrice" * "OrderItem"."productNumber" -  "OrderItem"."productDiscount"), 0) AS sales'),
    knex.raw('COALESCE(SUM("OrderItem"."productPrice" * "OrderItem"."productNumber" -  "OrderItem"."productDiscount"), 0) / 50000 * 100 AS kpi'),
  ])
  .from('User')
  .where((builder) => {
    builder.where('User.role', 'manager');
    if (managerId) {
      builder.andWhere('User.id', managerId);
    }
  })
  .leftJoin('Order', (builder) => {
    builder.on('User.id', '=', 'Order.managerId');
    if (from) {
      builder.on('Order.deliveryDate', '>=', knex.raw('?', [DateTime.fromISO(from).toSQL()]));
    }
    if (to) {
      builder.on('Order.deliveryDate', '<=', knex.raw('?', [DateTime.fromISO(to).toSQL()]));
    }
    return builder;
  })
  .leftJoin('OrderItem', 'Order.id', 'OrderItem.orderId')
  .groupBy('User.id');

module.exports = {
  getManagerRating,
};
