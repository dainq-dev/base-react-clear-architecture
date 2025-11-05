import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { IntentsController } from './intents.controller';
import { IntentsService } from './intents.service';
import { IntentRouter } from './intent.router';
import { IntentMapper } from './intent.mapper';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [IntentsController],
  providers: [IntentsService, IntentRouter, IntentMapper],
})
export class IntentsModule {}

