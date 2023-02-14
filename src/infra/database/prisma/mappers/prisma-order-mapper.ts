import { Order as RawOrder } from '@prisma/client';
import { Order } from '@app/entities/order/order';

export class PrismaOrderMapper {
  static toPrisma(order: Order) {
    return {
      id: order.id,
      stockIds: order.stockIds.toString(),
      name: order.name,
      description: order.description,
      price: order.price,
      isCanceled: order.isCanceled ?? false,
      reason: order.reason,
      category: order.category,
      canceledAt: order.canceledAt,
      updatedAt: order.updatedAt,
      createdAt: order.createdAt,
    };
  }

  static toDomain(raw: RawOrder): Order {
    return new Order(
      {
        id: raw.id,
        stockIds: raw.stockIds.split(','),
        name: raw.name,
        description: raw.description,
        price: raw.price,
        isCanceled: raw.isCanceled,
        category: raw.category,
        reason: raw.reason,
        canceledAt: raw.canceledAt,
        updatedAt: raw.updatedAt,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
