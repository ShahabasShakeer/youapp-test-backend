import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('send')
  async sendMessage(@Body() createChatDto: CreateChatDto) {
    return this.chatService.createMessage(createChatDto);
  }

  @ApiQuery({ name: 'senderId', type: String })
  @ApiQuery({ name: 'receiverId', type: String })
  @Get('messages')
  async getMessages(@Query('senderId') senderId: string, @Query('receiverId') receiverId: string) {
    return this.chatService.getMessages(senderId, receiverId);
  }
}
