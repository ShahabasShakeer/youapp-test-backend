import { Schema } from 'mongoose';

export const ProfileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  photo: { type: String },
  about: { type: String },
  interests: [{ type: String }],
  displayName: { type: String },
  gender: { type: String, enum: ['Male', 'Female'] },
  birthday: { type: Date },
  horoscope: { type: String },
  zodiac: { type: String },
  height: { type: Number },
  weight: { type: Number },
});
