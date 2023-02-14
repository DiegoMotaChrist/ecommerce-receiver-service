import { InMemoryOrderRepository } from '@test/repositories/in-memory-order-repository';
import { InMemoryStockRepository } from '@test/repositories/in-memory-stock-repository';
import { CreateStock } from '../stock/create-stock';
import { FindStocks } from '../stock/find-stocks';
import { FindOrders } from './find-orders';
import { SendOrder } from './send-order';
import { HttpException } from '@nestjs/common';
import { CancelOrder } from './cancel-order';

describe('Cancel Order', () => {
  let cancelOrder: any;
  let orderRepository: any;
  let stockRepository: any;

  it('should be able to cancel a order', async () => {

    orderRepository = new InMemoryOrderRepository();
    stockRepository = new InMemoryStockRepository();
    cancelOrder = new CancelOrder(orderRepository, stockRepository);
    const sendOrder = new SendOrder(orderRepository, stockRepository);
    const findORders = new FindOrders(orderRepository);
    const createStock = new CreateStock(stockRepository);
    const findStocks = new FindStocks(stockRepository);

    await createStock.execute({
      name: "playstation",
      category: "videogame",
      description: "novo",
      price: 1500,
      quantity: 2
    });

    const { stocks } = await findStocks.execute();

    await sendOrder.execute({
      category: "eletrônico",
      description: "produto de qualidade",
      name: "pedido 1",
      stockIds: [
        { quantity: 2, stockId: stocks[0].id }
      ]
    });

    const { orders } = await findORders.execute();

    const { order } = await cancelOrder.execute({
      orderId: orders[0].id,
      reason: "cancelado por falta de pagamento"
    })

    expect(order).not.toBeUndefined();
    expect(stocks[0].quantity).toEqual(2);
  });

  it('non-existent order', async () => {
    expect(async () => {
      return await cancelOrder.execute({
        orderId: 'any_id',
        reason: "cancelado por falta de pagamento"
      });
    }).rejects.toThrow(HttpException);
  });
});
