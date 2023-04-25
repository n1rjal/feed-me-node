import { Module } from '@nestjs/common';
import { FeedModule } from '../feed/feed.module';
import { FeedWsModule } from '@modules/feed-ws/feed-ws.module';

@Module({
  imports: [FeedModule, FeedWsModule],
})
export class SharedModule {}
