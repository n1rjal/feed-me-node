import { Module } from '@nestjs/common';
import { FeedWsService } from './feed-ws.service';
import { FeedWsGateway } from './feed-ws.gateway';

@Module({
  providers: [FeedWsGateway, FeedWsService],
})
export class FeedWsModule {}
