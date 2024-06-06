import { Document, Types } from 'mongoose';

export interface Profile extends Document {
  userId: Types.ObjectId;
  photo: string;
  about: string;
  interests: string[];
  displayName: string;
  gender: string;
  birthday: Date;
  horoscope: string;
  zodiac: string;
  height: number;
  weight: number;
}
