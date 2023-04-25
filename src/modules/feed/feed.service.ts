import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PublishToFeedDto } from './dto/publish-to-feed.dto';
import { FEED_DATA_RECEIVED } from '../../common/events.constants';
import { FeedType, IMessageEvent } from './feed.interface';

@Injectable()
export class FeedService {
  constructor(private eventEmitter: EventEmitter2) {}

  /**
   * The function sends a feed with a message and title to a specified ID and type.
   * @param {SendFeedDataInterface} data - The parameter `data` is an object of type
   * `SendFeedDataInterface` which contains the following properties:
   */
  async sendFeed(data: PublishToFeedDto): Promise<PublishToFeedDto> {
    this.eventEmitter.emit(FEED_DATA_RECEIVED, {
      data: {
        message: data.message,
        title: data.title,
      },
      id: data.id,
      retry: 4,
      type: FeedType.APPLICATION,
      room: data.room,
    } as IMessageEvent);
    return data;
  }
}
