import { Order } from '@app/entities/order/order';
import { Stock, StockInformation } from '@app/entities/order/stock';
import { OrderRepository } from '@app/repositories/order-repository';
import { StockRepository } from '@app/repositories/stock-repository';
import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';

interface CancelOrderRequest {
  orderId: string;
  reason: string;
}

interface CancelOrderResponse {
  order: Order;
}

@Injectable()
export class CancelOrder {
  constructor(private orderRepository: OrderRepository, private stockRepository: StockRepository) {}

  async execute(request: CancelOrderRequest): Promise<CancelOrderResponse> {
    const { orderId, reason } = request;
    let stocks: Stock[] = [];
    let stockIds: StockInformation[] = []

    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new HttpException(`Order ${orderId} not found`, 400);
    
    }
    order.cancel(reason);

    stockIds = order.stockIds.map(stockInformation => {
      const splitedStockInformation = stockInformation.split('|')
      return {stockId: splitedStockInformation[0], quantity: Number(splitedStockInformation[1])}
    })

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

    await this.orderRepository.update(order);

    stocks.map(async (stock) => {
      const stockId = stockIds.find(
        (stockInformation) => (stockInformation.stockId = stock.id),
      );
      stock.quantity += stockId?.quantity?? 0;
      await this.stockRepository.update(stock);
    });

    return { order };
  }
}
