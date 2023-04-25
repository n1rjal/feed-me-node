import { Body, Controller, Param, Post, Sse } from '@nestjs/common';

import { Observable, map } from 'rxjs';
import { PublishToFeedDto } from './dto/publish-to-feed.dto';
import { FeedSseService } from './feed-sse.service';
import { IMessageEvent } from './feed.interface';
import { FeedService } from './feed.service';

@Controller('feed')
export class FeedController {
  constructor(
    private readonly feedService: FeedService,
    private readonly feedSseService: FeedSseService,
  ) {}

  @Sse('/sse/:room')
  getFeed(
    @Param('room')
    room: string,
  ): Observable<IMessageEvent> {
    const observable = this.feedSseService.subject.asObservable();
    return observable.pipe(
      map((data) => (data.room === room ? data : null)),
      map((data) => {
        console.log(data);
        return {
          id: data.id,
          data: data.data,
          room: data.room,
        };
      }),
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
