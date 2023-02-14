import { Order } from '@app/entities/order/order';

export class OrderViewModel {
  static toHTTP(order: Order) {
    return {
      stockIds: order.stockIds,
      id: order.id,
      category: order.category,
      price: order.price,
      description: order.description,
      name: order.name,
    };
  }
}
