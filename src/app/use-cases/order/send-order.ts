import { Order } from '@app/entities/order/order';
import { Stock, StockInformation } from '@app/entities/order/stock';
import { OrderRepository } from '@app/repositories/order-repository';
import { StockRepository } from '@app/repositories/stock-repository';
import { PrismaStockMapper } from '@infra/database/prisma/mappers/prisma-stock-mapper';
import { StockViewModel } from '@infra/http/view-models/stock-view-model';
import { HttpException, Injectable } from '@nestjs/common';

export interface SendOrderRequest {
  stockIds: StockInformation[];
  name: string;
  description: string;
  category: string;
}

@Injectable()
export class SendOrder {
  constructor(
    private orderRepository: OrderRepository,
    private stockRepository: StockRepository,
  ) { }

  async execute(request: SendOrderRequest) {
    const { name, description, category, stockIds } = request;
    let stocks: Stock[] = [];

    await Promise.all(
      stockIds.map(async (stockInformation) => {
        const { stockId } = stockInformation;
        const stock = await this.stockRepository.findById(stockId);
        if (!stock) {
          throw new HttpException(`Stock ${stockId} not found`, 400);
        }
        return stock;
      }),
    )
      .then((items: Stock[]) => {
        stocks = items
      })
      .catch((err) => {
        throw err;
      });

    const sumPrices: number = stocks
      .map((stock: Stock) => {
        const stockQuantity: StockInformation | undefined = stockIds.find(
          (stockInformation) => stockInformation.stockId == stock.id,
        );

        return stockQuantity?.quantity ?? 0 * stock.price;
      })
      .reduce((sum, price) => (sum + price));

    const order = new Order({
      stockIds: stockIds.map(
        (stockInformation) =>
          `${stockInformation.stockId}|${stockInformation.quantity}`,
      ),
      name,
      description,
      category,
      price: sumPrices,
    });

    this.orderRepository.create(order);

    stocks.map(async (stock) => {
      const stockId = stockIds.find(
        (stockInformation) => (stockInformation.stockId = stock.id),
      );
      stock.quantity -= stockId?.quantity?? 0;
      await this.stockRepository.update(stock);
    });
  }
}
