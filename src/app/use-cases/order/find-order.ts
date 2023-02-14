import { Order } from '@app/entities/order/order';
import { OrderRepository } from '@app/repositories/order-repository';
import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';

interface FindOrderRequest {
  orderId: string;
}

interface FindOrderResponse {
  order: Order;
}

@Injectable()
export class FindOrder {
  constructor(private orderRepository: OrderRepository) {}

  async execute(request: FindOrderRequest): Promise<FindOrderResponse> {
    const { orderId } = request;

    const order = await this.orderRepository.findById(orderId);

    if (!order || order.isCanceled) {
      throw new HttpException(`Order ${orderId} not found`, 400);
    }

    return { order };
  }
}
