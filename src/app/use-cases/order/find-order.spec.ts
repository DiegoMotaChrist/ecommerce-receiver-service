import { InMemoryOrderRepository } from "@test/repositories/in-memory-order-repository";
import { InMemoryStockRepository } from "@test/repositories/in-memory-stock-repository";
import { CreateStock } from "../stock/create-stock";
import { FindStocks } from "../stock/find-stocks";
import { FindOrder } from "./find-order";
import { FindOrders } from "./find-orders";
import { SendOrder } from "./send-order";
import { HttpException } from '@nestjs/common';

describe('Find Order', () => {
  let findOrder: any;
  it('should be able to find a order', async () => {
    const orderRepository = new InMemoryOrderRepository();
    const stockRepository = new InMemoryStockRepository();
    const sendOrder = new SendOrder(orderRepository, stockRepository);
    findOrder = new FindOrder(orderRepository);
    const findOrders = new FindOrders(orderRepository);
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

    const { orders } = await findOrders.execute();

    const order = findOrder.execute({ orderId: orders[0].id })

    expect(order).not.toBeUndefined();
  });

  it('non-existent order', async () => {
    expect(async () => {
      return await findOrder.execute({
        orderId: 'any_id'
      });
    }).rejects.toThrow(HttpException);

  });
});
