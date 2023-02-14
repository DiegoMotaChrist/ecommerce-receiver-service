import { OrderRepository } from '@app/repositories/order-repository';
import { StockRepository } from '@app/repositories/stock-repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaOrderRepository } from './prisma/repositories/prisma-order-repository';
import { PrismaStockRepository } from './prisma/repositories/prisma-stock-repository';

@Module({
  providers: [
    PrismaService,
    { provide: OrderRepository, useClass: PrismaOrderRepository },
    { provide: StockRepository, useClass: PrismaStockRepository },
  ],
  exports: [OrderRepository, StockRepository],
})
export class DatabaseModule {}
