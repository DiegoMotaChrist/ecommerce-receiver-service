import { CancelOrder } from '@app/use-cases/order/cancel-order';
import { EditOrder } from '@app/use-cases/order/edit-order';
import { SendOrder } from '@app/use-cases/order/send-order';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { OrderController } from './kafka-consumer/controllers/order.controller';
import { KafkaConsumerService } from './kafka-consumer/kafka-consumer.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    KafkaConsumerService,
    SendOrder,
    EditOrder,
    CancelOrder,
  ],
  controllers: [OrderController],
})
export class MessagingModule {}
