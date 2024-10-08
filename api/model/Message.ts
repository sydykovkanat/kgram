import mongoose, { Schema } from 'mongoose';
import type { MessageFront } from '../types';

const MessageSchema = new Schema<MessageFront>({
  message: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  datetime: {
    type: String,
    required: true,
  },
});

export const Message = mongoose.model('Message', MessageSchema);
