import { MessageEvent } from '@nestjs/common';

export interface FeedData {
  title: string;
  message: string;
}

export enum FeedType {
  APPLICATION = 'APPLICATION',
  MESSAGE = 'COMMENT',
  NOTIFICATION = 'NOTIFICATION',
  SMS = 'SMS',
  EMAIL = 'EMAIL',
}

export interface IMessageEvent extends MessageEvent {
  id: string;
  data: FeedData;
  room: string;
}
