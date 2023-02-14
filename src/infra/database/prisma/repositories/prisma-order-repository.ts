import { Order } from '@app/entities/order/order';
import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../../../app/repositories/order-repository';
import { PrismaOrderMapper } from '../mappers/prisma-order-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(private prisma: PrismaService) {}

  async create(order: Order): Promise<void> {
    const raw = PrismaOrderMapper.toPrisma(order);
    await this.prisma.order.create({ data: raw });
  }

  async findById(orderId: string): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      return null;
    }

    return PrismaOrderMapper.toDomain(order);
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.prisma.order.findMany();
    return orders.map(PrismaOrderMapper.toDomain);
  }

  async update(order: Order): Promise<Order> {
    const raw = PrismaOrderMapper.toPrisma(order);
    await this.prisma.order.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
    return order;
  }
}
