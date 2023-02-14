import { Order } from '../entities/order/order';

export abstract class OrderRepository {
  abstract create(order: Order): Promise<void>;
  abstract findById(orderId: string): Promise<Order | null>;
  abstract findAll(): Promise<Order[]>;
  abstract update(order: Order): Promise<Order>;
}
