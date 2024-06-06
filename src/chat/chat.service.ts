import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './models/chat.model';
import { CreateChatDto } from './dto/create-chat.dto';
import * as amqp from 'amqplib';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel('Chat') private chatModel: Model<Chat>,
  ) {}

  async createMessage(createChatDto: CreateChatDto): Promise<Chat> {
    const createdMessage = new this.chatModel(createChatDto);
    return await createdMessage.save();
  }

  async getMessages(senderId: string, receiverId: string): Promise<Chat[]> {
    return await this.chatModel
      .find({ $or: [{ senderId, receiverId }, { senderId: receiverId, receiverId: senderId }] })
      .sort('timestamp')
      .exec();
  }

  async sendMessageToQueue(message: CreateChatDto) {
    const connection = await amqp.connect('amqp://rabbitmq:5672');
    const channel = await connection.createChannel();
    const queue = 'chat_messages';

    await channel.assertQueue(queue, {
      durable: false
    });

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  }
}
