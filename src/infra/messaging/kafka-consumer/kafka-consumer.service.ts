import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'order',
        brokers: ['hardy-sunbeam-9743-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'aGFyZHktc3VuYmVhbS05NzQzJJaixZhZtw4trvYhaceDio5q37SogdEPhJNlXwE',
          password: '76174759430a42fe8895eced47ef2d6a',
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
