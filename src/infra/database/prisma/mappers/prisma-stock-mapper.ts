import { Stock as StockOrder } from '@prisma/client';
import { Stock } from '@app/entities/order/stock';

export class PrismaStockMapper {
  static toPrisma(stock: Stock) {
    return {
      id: stock.id,
      name: stock.name,
      description: stock.description,
      price: stock.price,
      quantity: stock.quantity,
      category: stock.category,
      isDeleted: stock.isDeleted ?? false,
      updatedAt: stock.updatedAt,
      createdAt: stock.createdAt,
      deletedAt: stock.deletedAt,
    };
  }

  static toDomain(raw: StockOrder): Stock {
    return new Stock(
      {
        id: raw.id,
        name: raw.name,
        description: raw.description,
        price: raw.price,
        quantity: raw.quantity,
        category: raw.category,
        isDeleted: raw.isDeleted,
        deletedAt: raw.deletedAt,
        updatedAt: raw.updatedAt,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
