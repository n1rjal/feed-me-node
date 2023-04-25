import { IMessageEvent } from '@modules/feed/feed.interface';
import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: true,
  transport: ['websocket', 'pooling'],
})
export class FeedWsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  async handleConnection(socket: Socket) {
    const room = socket.handshake.query['room'];
    if (!room) return;
  }

  sendFeedData(data: IMessageEvent) {
    this.server.to(data.room).emit('feed', {
      ...data,
      message: data.data.message,
      title: data.data.title,
    });
  }
}
