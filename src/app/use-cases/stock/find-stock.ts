import { Stock } from '@app/entities/order/stock';
import { StockRepository } from '@app/repositories/stock-repository';
import { HttpException, Injectable } from '@nestjs/common';

interface FindStockRequest {
  stockId: string;
}

interface FindStockResponse {
  stock: Stock;
}

@Injectable()
export class FindStock {
  constructor(private stockRepository: StockRepository) {}

  async execute(request: FindStockRequest): Promise<FindStockResponse> {
    const { stockId } = request;

    const stock = await this.stockRepository.findById(stockId);

    console.log(stock);
    

    if (!stock || stock.isDeleted) {
      throw new HttpException(`Stock ${stockId} not found`, 400);
    }

    return { stock };
  }
}
