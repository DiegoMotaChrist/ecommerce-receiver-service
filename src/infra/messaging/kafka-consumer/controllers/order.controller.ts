import { StockInformation } from '@app/entities/order/stock';
import { CancelOrder } from '@app/use-cases/order/cancel-order';
import { EditOrder } from '@app/use-cases/order/edit-order';
import { SendOrder } from '@app/use-cases/order/send-order';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

interface SendOrderPayload {
  stockIds: StockInformation[];
  name: string;
  description: string;
  category: string;
}

interface editOrderPayload {
  orderId: string;
  stockIds: StockInformation[];
  name: string;
  description: string;
  category: string;
}

interface cancelOrderPayload {
  orderId: string;
  reason: string;
}

@Controller()
export class OrderController {
  constructor(
    private sendOrder: SendOrder,
    private editOrder: EditOrder,
    private cancelOrder: CancelOrder,
  ) {}

  @EventPattern('order.send-order')
  async handleSendOrder(
    @Payload() { category, description, name, stockIds }: SendOrderPayload,
  ) {
    await this.sendOrder.execute({
      stockIds,
      category,
      description,
      name,
    });
  }

  @EventPattern('order.edit-order')
  async handleEditOrder(
    @Payload() { category, description, name, orderId, stockIds }: editOrderPayload,
  ) {
    await this.editOrder.execute({
      stockIds,
      category,
      description,
      name,
      orderId,
    });
  }

  @EventPattern('order.cancel-order')
  async handleCancelOrder(@Payload() { reason, orderId }: cancelOrderPayload) {
    await this.cancelOrder.execute({
      reason,
      orderId,
    });
  }
}
