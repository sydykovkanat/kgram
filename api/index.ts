import express from 'express';
import expressWs from 'express-ws';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './config';
import { Message } from './model/Message';
import { User } from './model/User';
import { messagesRouter } from './routers/messages';
import { usersRouter } from './routers/users';
import type { ActiveConnections, MessageApi, MessageFront, UserOnline } from './types';

const app = express();
expressWs(app);

app.use(cors());
app.use(express.json());
app.use('/users', usersRouter);
app.use('/messages', messagesRouter);

const chatRouter = express.Router();

const activeConnections: ActiveConnections = {};
let userOnline: UserOnline[] = [];

chatRouter.ws('/chat', async (ws, _req) => {
  const id = crypto.randomUUID();
  activeConnections[id] = ws;
  let username: UserOnline;
  const messages: MessageApi[] = await Message.find().populate('userId', 'avatar googleID displayName');

  ws.send(
    JSON.stringify({
      type: 'WELCOME',
      payload: messages,
    })
  );

  ws.on('message', async (message) => {
    const messageData = JSON.parse(message.toString());
    if (messageData.type === 'NEW_USER') {
      const user = await User.findById({ _id: messageData.id });
      if (!user) {
        return ws.close();
      }

      const newUser = {
        _id: id,
        displayName: user.displayName,
      };

      userOnline.push(newUser);
      username = newUser;

      Object.values(activeConnections).forEach((connection) => {
        const outgoingMessage = { type: 'SET_ONLINE_USERS', payload: userOnline };
        connection.send(JSON.stringify(outgoingMessage));
      });
    }

    if (messageData.type === 'NEW_MESSAGE') {
      const message: MessageFront = {
        userId: messageData.payload.userId,
        message: messageData.payload.message,
        datetime: new Date().toISOString(),
      };

      const saveMessage = new Message(message);
      await saveMessage.save();

      const messageById = await Message.findOne({ _id: saveMessage._id.toString() }).populate('userId', 'displayName');

      Object.values(activeConnections).forEach((connection) => {
        const outgoingMessage = { type: 'NEW_MESSAGE', payload: messageById };
        connection.send(JSON.stringify(outgoingMessage));
      });
    }
  });

  ws.on('close', () => {
    userOnline = userOnline.filter((user) => user !== username);
    Object.values(activeConnections).forEach((connection) => {
      const outgoingMessage = { type: 'SET_ONLINE_USERS', payload: userOnline };
      connection.send(JSON.stringify(outgoingMessage));
    });

    delete activeConnections[id];
  });
});

app.use(chatRouter);

const run = async () => {
  await mongoose.connect(config.database);

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
