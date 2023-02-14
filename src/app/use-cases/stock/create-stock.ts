import { Stock } from '@app/entities/order/stock';
import { StockRepository } from '@app/repositories/stock-repository';
import { Injectable } from '@nestjs/common';

export interface CreateStockRequest {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
}

@Injectable()
export class CreateStock {
  constructor(private stockRepository: StockRepository) {}

  async execute(request: CreateStockRequest) {
    const { name, description, category, price, quantity } = request;

    const stock = new Stock({ name, description, category, price, quantity });

    this.stockRepository.create(stock);
  }
}
