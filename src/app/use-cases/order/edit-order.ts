import { Order } from '@app/entities/order/order';
import { Stock, StockInformation } from '@app/entities/order/stock';
import { OrderRepository } from '@app/repositories/order-repository';
import { StockRepository } from '@app/repositories/stock-repository';
import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';

interface EditOrderRequest {
  stockIds?: StockInformation[];
  name?: string;
  description?: string;
  category?: string;
  orderId: string;
}

interface EditOrderResponse {
  order: Order;
}

@Injectable()
export class EditOrder {
  constructor(private orderRepository: OrderRepository, private stockRepository: StockRepository) { }

  async execute(request: EditOrderRequest): Promise<EditOrderResponse> {
    const { name, description, category, orderId, stockIds } = request;
    let stocks: Stock[] = [];
    let oldStocks: Stock[] = [];
    let sumPrices: number = 0;
    let order = await this.orderRepository.findById(orderId);
    const oldStockIds: StockInformation[] | undefined = order?.stockIds.map(stockInformation => {
      const splitedStockInformation = stockInformation.split('|')
      return { stockId: splitedStockInformation[0], quantity: Number(splitedStockInformation[1]) }
    })

    if (!order) {
      throw new HttpException(`Order ${orderId} not found`, 400);
    }

    if (oldStockIds){
      await Promise.all(
        oldStockIds.map(async (stockInformation) => {
          const { stockId } = stockInformation;
          const stock = await this.stockRepository.findById(stockId);
          if (!stock) {
            throw new HttpException(`Stock ${stockId} not found`, 400);
          }
          return stock;
        }),
      )
        .then((items: Stock[]) => {
          oldStocks = items
        })
        .catch((err) => {
          throw err;
        });
    }

    if (stockIds) {
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

      sumPrices = stocks
        .map((stock: Stock) => {
          const stockQuantity: StockInformation | undefined = stockIds.find(
            (stockInformation) => stockInformation.stockId == stock.id,
          );

          return stockQuantity?.quantity ?? 0 * stock.price;
        })
        .reduce((sum, price) => (sum + price));
    }
  
    order.name = name ?? order.name;
    order.description = description ?? order.description;
    order.category = category ?? order.category;
    order.stockIds = stockIds ? stockIds.map(stockInformation => `${stockInformation.stockId}|${stockInformation.quantity}`) : order.stockIds;
    order.price = sumPrices && stockIds ? sumPrices : order.price;

    order.update();

    await this.orderRepository.update(order);

    oldStocks.map(async (stock) => {
      const oldStockId = oldStockIds?.find(stockInformation => stock.id == stockInformation.stockId);
      stock.quantity += oldStockId?.quantity?? 0;
      await this.stockRepository.update(stock);
    });

    stocks.map(async (stock) => {
      const oldStockId = oldStockIds?.find(stockInformation => stock.id == stockInformation.stockId);
      const stockId = stockIds?.find(
        (stockInformation) => (stockInformation.stockId = stock.id),
      );
      stock.quantity += oldStockId?.quantity?? 0;
      stock.quantity -= stockId?.quantity ?? 0;
      await this.stockRepository.update(stock);
    });


    return { order };
  }
}
