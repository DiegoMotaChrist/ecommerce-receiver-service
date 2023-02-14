import { Stock } from '@app/entities/order/stock';

export class StockViewModel {
  static toHTTP(stock: Stock) {
    return {
      id: stock.id,
      category: stock.category,
      price: stock.price,
      description: stock.description,
      name: stock.name,
      quantity: stock.quantity,
    };
  }
}
