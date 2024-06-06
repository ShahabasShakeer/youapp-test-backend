import { Document, Types } from 'mongoose';

export interface Chat extends Document {
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  message: string;
  timestamp: Date;
}
