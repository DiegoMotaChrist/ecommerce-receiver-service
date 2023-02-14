import { Controller, Get, Param } from '@nestjs/common';
import { FindOrder } from '@app/use-cases/order/find-order';
import { FindOrders } from '@app/use-cases/order/find-orders';
import { OrderViewModel } from '../view-models/order-view-model';

@Controller('order')
export class OrderController {
  constructor(private findOrder: FindOrder, private findOrders: FindOrders) {}

  @Get(':id')
  async get(@Param('id') id: string) {
    const { order } = await this.findOrder.execute({
      orderId: id,
    });

    return OrderViewModel.toHTTP(order);
  }

  @Get()
  async getList() {
    const { orders } = await this.findOrders.execute();
    return orders.map(OrderViewModel.toHTTP);
  }
}
