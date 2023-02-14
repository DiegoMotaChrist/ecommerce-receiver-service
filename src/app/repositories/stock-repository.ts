import { Stock } from '@app/entities/order/stock';
import { Order } from '../entities/order/order';

export abstract class StockRepository {
  abstract create(stock: Stock): Promise<void>;
  abstract update(stock: Stock): Promise<Stock>;
  abstract findById(stockId: string): Promise<Stock | null>;
  abstract findAll(): Promise<Stock[]>;
}
