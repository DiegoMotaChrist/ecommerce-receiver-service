import { InMemoryStockRepository } from '@test/repositories/in-memory-stock-repository';
import { CreateStock } from './create-stock';
import { EditStock } from './edit-stock';
import { FindStocks } from './find-stocks';
import { HttpException } from '@nestjs/common';

describe('Edit Stock', () => {
  const stockRepository = new InMemoryStockRepository();
  const createStock = new CreateStock(stockRepository);
  const editStock = new EditStock(stockRepository);
  const findStocks = new FindStocks(stockRepository);

  it('should be able to edit a attribute by stock', async () => {

    await createStock.execute({
      name: "playstation",
      category: "videogame",
      description: "novo",
      price: 1500,
      quantity: 2
    });

    const { stocks } = await findStocks.execute();

    const { stock } = await editStock.execute({
      stockId: stocks[0].id,
      category: 'nova categoria',
    })

    expect(stock).not.toBeUndefined();
    expect(stock.category).toEqual('nova categoria');
  });

  it('non-existent stock', async () => {
    expect(async () => {
      return await editStock.execute({
        stockId: 'any_id',
      });
    }).rejects.toThrow(HttpException);
  });
});
