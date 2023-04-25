import { Global, Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { FeedSseService } from './feed-sse.service';

@Global()
@Module({
  controllers: [FeedController],
  providers: [FeedService, FeedSseService],
})
export class FeedModule {}
