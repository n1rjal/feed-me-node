import {
  Body,
  Controller,
  MessageEvent,
  Param,
  Post,
  Sse,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { Observable, map } from 'rxjs';
import { PublishToFeedDto } from './dto/publish-to-feed.dto';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Sse('/sse/:room')
  getFeed(
    @Param('room')
    room: string,
  ): Observable<MessageEvent> {
    const feedObservable = this.feedService.feedSubject.asObservable();
    return feedObservable.pipe(
      map((event) => (event.room === room ? event : null)),
    );
  }

  @Post('/:room')
  publishToFeed(
    @Param('room') room: string,
    @Body()
    publishToFeedBody: PublishToFeedDto,
  ) {
    return this.feedService.sendFeed({
      ...publishToFeedBody,
      id: publishToFeedBody.id,
      room,
    });
  }
}
