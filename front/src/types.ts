export interface LoginMutation {
  username: string;
  password: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
  displayName: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface OnlineUser {
  displayName: string;
  _id: string;
}

export interface MessageApi {
  _id: string;
  message: string;
  datetime: string;
  userId: OnlineUser;
}

export interface IncomingWelcomeChat {
  type: 'WELCOME';
  payload: MessageApi[];
}
export interface IncomingChatMessage {
  type: 'NEW_MESSAGE';
  payload: MessageApi;
}

export interface IncomingOnlineUsers {
  type: 'SET_ONLINE_USERS';
  payload: OnlineUser[];
}

export interface IncomingNewMessage {
  type: 'NEW_MESSAGE';
  payload: MessageApi;
}

export type IncomingMessage = IncomingChatMessage | IncomingWelcomeChat | IncomingOnlineUsers;
