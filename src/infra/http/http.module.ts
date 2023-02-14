import { CancelOrder } from '@app/use-cases/order/cancel-order';
import { CreateStock } from '@app/use-cases/stock/create-stock';
import { EditOrder } from '@app/use-cases/order/edit-order';
import { FindOrder } from '@app/use-cases/order/find-order';
import { FindOrders } from '@app/use-cases/order/find-orders';
import { SendOrder } from '@app/use-cases/order/send-order';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { OrderController } from './controllers/order.controller';
import { StockController } from './controllers/stock.controller';
import { FindStock } from '@app/use-cases/stock/find-stock';
import { FindStocks } from '@app/use-cases/stock/find-stocks';
import { EditStock } from '@app/use-cases/stock/edit-stock';
import { DeleteStock } from '@app/use-cases/stock/delete-stock';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController, StockController],
  providers: [
    SendOrder,
    FindOrder,
    CancelOrder,
    FindOrders,
    EditOrder,
    CreateStock,
    FindStock,
    FindStocks,
    EditStock,
    DeleteStock,
  ],
})
export class HttpModule {}
