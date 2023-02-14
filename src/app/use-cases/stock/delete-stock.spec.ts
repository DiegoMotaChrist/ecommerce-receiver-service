import { InMemoryStockRepository } from '@test/repositories/in-memory-stock-repository';
import { CreateStock } from './create-stock';
import { DeleteStock } from './delete-stock';
import { FindStocks } from './find-stocks';
import { HttpException } from '@nestjs/common';

describe('Delete Stock', () => {
  const stockRepository = new InMemoryStockRepository();
  const createStock = new CreateStock(stockRepository);
  const findStocks = new FindStocks(stockRepository);
  const deleteStock = new DeleteStock(stockRepository);

  it('should be able to delete a stock', async () => {

    await createStock.execute({
      name: "playstation",
      category: "videogame",
      description: "novo",
      price: 1500,
      quantity: 2
    });

    const { stocks } = await findStocks.execute();

    const { stock } = await deleteStock.execute({
      stockId: stocks[0].id
    })

    expect(stock).not.toBeUndefined();
  });

  it('non-existent stock', async () => {
    expect(async () => {
      return await deleteStock.execute({
        stockId: 'any_id',
      });
    }).rejects.toThrow(HttpException);
  });
});
