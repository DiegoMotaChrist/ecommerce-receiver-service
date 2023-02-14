import { Stock } from '@app/entities/order/stock';
import { StockRepository } from '@app/repositories/stock-repository';
import { HttpException, Injectable } from '@nestjs/common';

interface DeleteStockRequest {
  stockId: string;
}

interface DeleteStockResponse {
  stock: Stock;
}

@Injectable()
export class DeleteStock {
  constructor(private stockRepository: StockRepository) {}

  async execute(request: DeleteStockRequest): Promise<DeleteStockResponse> {
    const { stockId } = request;

    const stock = await this.stockRepository.findById(stockId);

    if (!stock) {
      throw new HttpException(`Stock ${stockId} not found`, 400);
    }

    stock.delete();

    await this.stockRepository.update(stock);

    return { stock };
  }
}
