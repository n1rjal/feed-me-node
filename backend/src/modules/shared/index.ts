import { Module } from '@nestjs/common';
import { FeedModule } from '../feed/feed.module';

@Module({
  imports: [FeedModule],
})
export class SharedModule {}
