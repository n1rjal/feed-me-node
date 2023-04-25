import { FeedType } from '../feed.interface';
import { randomUUID } from 'node:crypto';
import { IsEnumField } from '@common/decorators/validation/IsEnumField';
import { IsStringField } from '@common/decorators/validation/IsStringField';

/* This is a TypeScript class for a data transfer object used to publish feed messages with a randomly
generated ID, feed type, title, and message. */
export class PublishToFeedDto {
  @IsEnumField(FeedType, {
    description: 'The type of the feed message',
    required: true,
    message: 'The type of the feed message is required',
  })
  feedType: FeedType;

  @IsStringField({
    required: false,
    description: 'The room of the feed message',
    message: 'The room of the feed message is required',
  })
  room: string;

  @IsStringField({
    required: true,
    description: 'The title of the feed message',
  })
  title: string;

  @IsStringField({
    required: true,
    description: 'The message of the feed message',
  })
  message: string;

  get id() {
    return randomUUID();
  }
}
