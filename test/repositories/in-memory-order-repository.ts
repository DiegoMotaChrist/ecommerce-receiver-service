import { Order } from '@app/entities/order/order';
import { OrderRepository } from '@app/repositories/order-repository';

export class InMemoryOrderRepository implements OrderRepository {

  public orders: Order[] = [];

  async findById(orderId: string): Promise<Order | null> {
    const order = this.orders.find(
      (item) => item.id === orderId,
    );

    if (!order) {
      return null;
    }

    return order;
  }


  async findAll(): Promise<Order[]> {
    return this.orders;
  }

  async create(order: Order) {
    this.orders.push(order);
  }

  async update(order: Order): Promise<Order> {
    const orderId: string = this.orders.filter(thisOrder => thisOrder.id == order.id)[0].id;
    this.orders.splice(this.orders.map(thisOrder => thisOrder.id).indexOf(orderId), 0, order);
    return order;
  }
}
