import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() createChatDto: CreateChatDto, @ConnectedSocket() client: Socket) {
    const message = await this.chatService.createMessage(createChatDto);
    this.server.emit('message', message);
    await this.chatService.sendMessageToQueue(createChatDto);
  }

  @SubscribeMessage('getMessages')
  async handleGetMessages(@MessageBody() data: { senderId: string, receiverId: string }) {
    const messages = await this.chatService.getMessages(data.senderId, data.receiverId);
    return messages;
  }
}
