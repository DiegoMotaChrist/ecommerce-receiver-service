import { Stock } from '@app/entities/order/stock';
import { StockRepository } from '@app/repositories/stock-repository';
import { HttpException, Injectable } from '@nestjs/common';

interface EditStockRequest {
  name?: string;
  description?: string;
  category?: string;
  price?: number;
  stockId: string;
  quantity?: number;
}

interface EditStockResponse {
  stock: Stock;
}

@Injectable()
export class EditStock {
  constructor(private stockRepository: StockRepository) {}

  async execute(request: EditStockRequest): Promise<EditStockResponse> {
    const { name, description, category, price, quantity, stockId } = request;

    let stock = await this.stockRepository.findById(stockId);

    if (!stock) {
      throw new HttpException(`Stock ${stockId} not found`, 400);
    }

    stock.name = name ?? stock.name;
    stock.description = description ?? stock.description;
    stock.category = category ?? stock.category;
    stock.price = price ?? stock.price;
    stock.quantity = quantity ?? stock.quantity;

    stock.update();

    await this.stockRepository.update(stock);

    return { stock };
  }
}
