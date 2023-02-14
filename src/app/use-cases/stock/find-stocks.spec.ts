import { InMemoryStockRepository } from '@test/repositories/in-memory-stock-repository';
import { CreateStock } from './create-stock';
import { FindStocks } from './find-stocks';

describe('Find Stocks', () => {
  const stockRepository = new InMemoryStockRepository();
  const createStock = new CreateStock(stockRepository);
  const findStocks = new FindStocks(stockRepository);

  it('should be able to find stocks', async () => {

    await createStock.execute({
      name: "playstation",
      category: "videogame",
      description: "novo",
      price: 1500,
      quantity: 2
    });

    const { stocks } = await findStocks.execute();

    expect(stocks).toHaveLength(1);
  });
});
