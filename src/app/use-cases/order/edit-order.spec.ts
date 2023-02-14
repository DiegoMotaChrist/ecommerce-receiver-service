import { InMemoryOrderRepository } from '@test/repositories/in-memory-order-repository';
import { InMemoryStockRepository } from '@test/repositories/in-memory-stock-repository';
import { CreateStock } from '../stock/create-stock';
import { FindStocks } from '../stock/find-stocks';
import { FindOrders } from './find-orders';
import { SendOrder } from './send-order';
import { HttpException } from '@nestjs/common';
import { EditOrder } from './edit-order';

describe('Edit Order', () => {
  let orderRepository: any;
  let stockRepository: any;
  let sendOrder: any;
  let editOrder: any;
  let findORders: any;
  let createStock: any;
  let findStocks: any;

  it('should be able to edit a one optional attribute by order', async () => {
    orderRepository = new InMemoryOrderRepository();
    stockRepository = new InMemoryStockRepository();
    sendOrder = new SendOrder(orderRepository, stockRepository);
    editOrder = new EditOrder(orderRepository, stockRepository);
    findORders = new FindOrders(orderRepository);
    createStock = new CreateStock(stockRepository);
    findStocks = new FindStocks(stockRepository);

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

    const { order } = await editOrder.execute({
      orderId: orders[0].id,
      category: "categoria nova"
    });

    expect(order).not.toBeUndefined();
    expect(order.category).toEqual("categoria nova")

  });

  it('should be able to edit a stock by order', async () => {
    orderRepository = new InMemoryOrderRepository();
    stockRepository = new InMemoryStockRepository();
    sendOrder = new SendOrder(orderRepository, stockRepository);
    editOrder = new EditOrder(orderRepository, stockRepository);
    findORders = new FindOrders(orderRepository);
    createStock = new CreateStock(stockRepository);
    findStocks = new FindStocks(stockRepository);

    await createStock.execute({
      name: "playstation 4",
      category: "videogame",
      description: "novo",
      price: 1500,
      quantity: 2
    });

    await createStock.execute({
      name: "playstation 5",
      category: "videogame",
      description: "novo",
      price: 5000,
      quantity: 5
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

    const { order } = await editOrder.execute({
      orderId: orders[0].id,
      stockIds: [
        { quantity: 4, stockId: stocks[1].id }
      ]
    });

    expect(order).not.toBeUndefined();
    expect(order.stockIds[0].split(',')[0].split('|')[0]).toEqual(stocks[1].id)
    expect(stocks[0].quantity).toEqual(2)
    expect(stocks[1].quantity).toEqual(1)

  });

  it('non-existent stock', async () => {
    orderRepository = new InMemoryOrderRepository();
    stockRepository = new InMemoryStockRepository();
    sendOrder = new SendOrder(orderRepository, stockRepository);
    editOrder = new EditOrder(orderRepository, stockRepository);
    findORders = new FindOrders(orderRepository);
    createStock = new CreateStock(stockRepository);
    findStocks = new FindStocks(stockRepository);
    
    await createStock.execute({
      name: "playstation 4",
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

    expect(async () => {
      await editOrder.execute({
        orderId: orders[0].id,
        stockIds: [
          { quantity: 2, stockId: 'any_id' }
        ]
      });
    }).rejects.toThrow(HttpException);
  });

  it('non-existent order', async () => {
    expect(async () => {
      return await editOrder.execute({
        orderId: 'any_id',
        stockIds: [
          { quantity: 2, stockId: 'any_id' }
        ]
      });
    }).rejects.toThrow(HttpException);
  });

  it('non-existent stock', async () => {
    const { orders } = await findORders.execute();
    expect(async () => {
      return await editOrder.execute({
        orderId: orders[0].id,
        stockIds: [
          { quantity: 2, stockId: 'any_id' }
        ]
      });
    }).rejects.toThrow(HttpException);
  });
});
