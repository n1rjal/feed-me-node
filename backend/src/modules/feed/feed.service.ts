import { Subject } from 'rxjs';
import { PublishToFeedDto } from './dto/publish-to-feed.dto';
import { FeedType, IMessageEvent } from './feed.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FeedService {
  feedSubject = new Subject<IMessageEvent>();

  /**
   * The function sends a feed with a message and title to a specified ID and type.
   * @param {SendFeedDataInterface} data - The parameter `data` is an object of type
   * `SendFeedDataInterface` which contains the following properties:
   */
  async sendFeed(data: PublishToFeedDto): Promise<PublishToFeedDto> {
    this.feedSubject.next({
      data: {
        message: data.message,
        title: data.title,
      },
      id: data.id,
      retry: 4,
      type: FeedType.APPLICATION,
      room: data.room,
    });
    return data;
  }
}
