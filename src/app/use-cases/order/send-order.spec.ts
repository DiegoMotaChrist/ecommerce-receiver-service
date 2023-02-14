import { InMemoryOrderRepository } from '@test/repositories/in-memory-order-repository';
import { InMemoryStockRepository } from '@test/repositories/in-memory-stock-repository';
import { CreateStock } from '../stock/create-stock';
import { FindStocks } from '../stock/find-stocks';
import { FindOrders } from './find-orders';
import { SendOrder } from './send-order';
import { HttpException } from '@nestjs/common';

describe('Send Order', () => {
  const orderRepository = new InMemoryOrderRepository();
  const stockRepository = new InMemoryStockRepository();
  const sendOrder = new SendOrder(orderRepository, stockRepository);
  const findORders = new FindOrders(orderRepository);
  const createStock = new CreateStock(stockRepository);
  const findStocks = new FindStocks(stockRepository);

  it('should be able to send a order', async () => {

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

    expect(orders).toHaveLength(1);
  });

  it('non-existent stock', async () => {
    expect(async () => {
      return await sendOrder.execute({
        category: "eletrônico",
        description: "produto de qualidade",
        name: "pedido 1",
        stockIds: [
          { quantity: 2, stockId: 'any_id' }
        ]
      });
    }).rejects.toThrow(HttpException);
  });
});
