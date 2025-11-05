import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IntentsModule } from './intents/intents.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    IntentsModule,
  ],
})
export class AppModule {}

