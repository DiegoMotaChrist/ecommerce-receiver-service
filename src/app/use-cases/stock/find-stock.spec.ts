import { InMemoryStockRepository } from '@test/repositories/in-memory-stock-repository';
import { CreateStock } from './create-stock';
import { FindStock } from './find-stock';
import { FindStocks } from './find-stocks';
import { HttpException } from '@nestjs/common';

describe('Find Stock', () => {
  let findStock: any;
  
  it('should be able to find a stock', async () => {
    const stockRepository = new InMemoryStockRepository();
    const createStock = new CreateStock(stockRepository);
    const findStocks = new FindStocks(stockRepository);
    findStock = new FindStock(stockRepository);

    await createStock.execute({
      name: "playstation",
      category: "videogame",
      description: "novo",
      price: 1500,
      quantity: 2
    });

    const { stocks } = await findStocks.execute();

    const { stock } = await findStock.execute({
      stockId: stocks[0].id
    })

    expect(stock).not.toBeUndefined();
  });

  it('non-existent stock', async () => {
    expect(async () => {
      return await findStock.execute({
        stockId: 'any_id',
      });
    }).rejects.toThrow(HttpException);

  });
});
