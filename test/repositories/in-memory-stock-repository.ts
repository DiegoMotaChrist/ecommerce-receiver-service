import { Stock } from '@app/entities/order/stock';
import { StockRepository } from '@app/repositories/stock-repository';

export class InMemoryStockRepository implements StockRepository {

  public stocks: Stock[] = [];

  async findById(stockId: string): Promise<Stock | null> {
    const stock = this.stocks.find(
      (item) => item.id === stockId,
    );

    if (!stock) {
      return null;
    }

    return stock;
  }


  async findAll(): Promise<Stock[]> {
    return this.stocks;
  }

  async create(stock: Stock) {
    this.stocks.push(stock);
  }

  async update(stock: Stock): Promise<Stock> {
    const stockId: string = this.stocks.filter(thisStock => thisStock.id == stock.id)[0].id;
    this.stocks.splice(this.stocks.map(thisStock => thisStock.id).indexOf(stockId), 0, stock);
    return stock;
  }
}
