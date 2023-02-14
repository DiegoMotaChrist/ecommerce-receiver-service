import { InMemoryOrderRepository } from "@test/repositories/in-memory-order-repository";
import { InMemoryStockRepository } from "@test/repositories/in-memory-stock-repository";
import { CreateStock } from "../stock/create-stock";
import { FindStocks } from "../stock/find-stocks";
import { FindOrders } from "./find-orders";
import { SendOrder } from "./send-order";

describe('Find Orders', () => {
  it('should be able to find orders', async () => {
      const orderRepository = new InMemoryOrderRepository();
      const stockRepository = new InMemoryStockRepository();
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

      expect(orders).toHaveLength(1);
  });
});
