import { FEED_DATA_RECEIVED } from '@common/events.constants';
import { FeedWsGateway } from '@modules/feed-ws/feed-ws.gateway';
import { OnEvent } from '@nestjs/event-emitter';
import { Subject } from 'rxjs';
import { IMessageEvent } from './feed.interface';

export class FeedSseService {
  constructor(private readonly feedWsGateway: FeedWsGateway) {}

  subject = new Subject<IMessageEvent>();

  @OnEvent(FEED_DATA_RECEIVED)
  handleFeedDataReceived(data: IMessageEvent) {
    this.subject.next({
      data: {
        message: data.data.message,
        title: data.data.title,
      },
      id: data.id,
      room: data.room,
      type: data.type,
    });
  }
}
