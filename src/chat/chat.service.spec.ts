import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { getModelToken } from '@nestjs/mongoose';
import { Chat } from './models/chat.model';

describe('ChatService', () => {
  let service: ChatService;
  let chatModel: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        {
          provide: getModelToken('Chat'),
          useValue: {
            new: jest.fn().mockResolvedValue({}),
            constructor: jest.fn().mockResolvedValue({}),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ChatService>(ChatService);
    chatModel = module.get(getModelToken('Chat'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createMessage', () => {
    it('should create a message', async () => {
      const createChatDto = { senderId: 'senderId', receiverId: 'receiverId', message: 'message' };
      chatModel.create.mockResolvedValue(createChatDto);
      const result = await service.createMessage(createChatDto);
      expect(result).toEqual(createChatDto);
    });
  });

  describe('getMessages', () => {
    it('should return messages', async () => {
      const senderId = 'senderId';
      const receiverId = 'receiverId';
      const messages = [{ senderId, receiverId, message: 'message' }];
      chatModel.find.mockResolvedValue(messages);
      const result = await service.getMessages(senderId, receiverId);
      expect(result).toEqual(messages);
    });
  });
});
