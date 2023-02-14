import { Stock } from '@app/entities/order/stock';
import { StockRepository } from '@app/repositories/stock-repository';
import { Injectable } from '@nestjs/common';

interface FindStocksResponse {
  stocks: Stock[];
}

@Injectable()
export class FindStocks {
  constructor(private stockRepository: StockRepository) {}

  async execute(): Promise<FindStocksResponse> {
    let stocks = await this.stockRepository.findAll();
    stocks = stocks.filter((stock) => !stock.isDeleted);
    return { stocks: stocks ?? [] };
  }
}
