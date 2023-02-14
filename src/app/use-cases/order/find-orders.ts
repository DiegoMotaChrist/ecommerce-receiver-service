import { Order } from '@app/entities/order/order';
import { OrderRepository } from '@app/repositories/order-repository';
import { Injectable } from '@nestjs/common';

interface FindOrdersResponse {
  orders: Order[];
}

@Injectable()
export class FindOrders {
  constructor(private orderRepository: OrderRepository) {}

  async execute(): Promise<FindOrdersResponse> {
    let orders = await this.orderRepository.findAll();
    orders = orders.filter((order) => !order.isCanceled);
    return { orders: orders ?? [] };
  }
}
