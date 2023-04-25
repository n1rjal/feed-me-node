import { Injectable } from '@nestjs/common';
import { FeedWsGateway } from './feed-ws.gateway';
import { FEED_DATA_RECEIVED } from '@common/events.constants';
import { OnEvent } from '@nestjs/event-emitter';
import { IMessageEvent } from '@modules/feed/feed.interface';

@Injectable()
export class FeedWsService {
  constructor(private readonly feedWsGateway: FeedWsGateway) {}

  @OnEvent(FEED_DATA_RECEIVED)
  sendEventToWs(data: IMessageEvent) {
    this.feedWsGateway.sendFeedData(data);
  }
}
