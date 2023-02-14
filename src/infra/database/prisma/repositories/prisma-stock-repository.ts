import { Order } from '@app/entities/order/order';
import { Stock } from '@app/entities/order/stock';
import { StockRepository } from '@app/repositories/stock-repository';
import { Injectable } from '@nestjs/common';
import { PrismaStockMapper } from '../mappers/prisma-stock-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaStockRepository implements StockRepository {
  constructor(private prisma: PrismaService) {}

  async create(stock: Stock): Promise<void> {
    const raw = PrismaStockMapper.toPrisma(stock);
    await this.prisma.stock.create({ data: raw });
  }

  async findById(stockId: string): Promise<Stock | null> {
    const stock = await this.prisma.stock.findUnique({
      where: {
        id: stockId,
      },
    });

    if (!stock) {
      return null;
    }

    return PrismaStockMapper.toDomain(stock);
  }

  async findAll(): Promise<Stock[]> {
    const stocks = await this.prisma.stock.findMany();
    return stocks.map(PrismaStockMapper.toDomain);
  }

  async update(stock: Stock): Promise<Stock> {
    const raw = PrismaStockMapper.toPrisma(stock);
    await this.prisma.stock.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
    return stock;
  }
}
