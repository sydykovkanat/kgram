import { type Model, Types } from 'mongoose';
import { WebSocket } from 'ws';

export interface UserFields {
  username: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;

export interface MessageFront {
  message: string;
  userId: Types.ObjectId;
  datetime: string;
}

export interface MessageApi extends MessageFront {
  _id: Types.ObjectId;
}

export interface UserOnline {
  _id: string;
  displayName: string;
}

export interface ActiveConnections {
  [id: string]: WebSocket;
}
