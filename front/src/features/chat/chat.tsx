import { useAppSelector } from '@/app/hooks';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Message } from '@/features/chat/components/message/message';
import { Sidebar } from '@/features/chat/components/sidebar/sidebar';
import { selectUser } from '@/features/users/usersSlice';
import { cn } from '@/lib/utils';
import type { IncomingMessage, MessageApi, OnlineUser } from '@/types';
import { RocketIcon } from '@radix-ui/react-icons';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './chat.module.css';

export const Chat: React.FC = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<MessageApi[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const ws = useRef<WebSocket | null>(null);
  const reverseMessages = messages.slice().reverse();

  useEffect(() => {
    if (!user) {
      navigate('/register');
    } else {
      ws.current = new WebSocket('ws://localhost:8000/chat');

      ws.current?.addEventListener('message', (event) => {
        const decodedMessage = JSON.parse(event.data) as IncomingMessage;

        if (decodedMessage.type === 'WELCOME') {
          setMessages(decodedMessage.payload);

          if (ws.current) {
            ws.current.send(
              JSON.stringify({
                type: 'NEW_USER',
                id: user?._id,
              })
            );
          }
        }
        if (decodedMessage.type === 'SET_ONLINE_USERS') {
          setOnlineUsers(decodedMessage.payload);
        }

        if (decodedMessage.type === 'NEW_MESSAGE') {
          setMessages((prevState) => [...prevState, decodedMessage.payload]);
        }
      });
      return () => {
        if (ws.current) ws.current?.close();
      };
    }
  }, [user, navigate]);

  if (user === null) {
    return (
      <p className={'text-sm text-muted-foreground absolute -translate-x-2/4 -translate-y-2/4 top-1/2 left-1/2'}>
        Please log in before visiting the site.
      </p>
    );
  }

  const handleSendMessage = (event: React.FormEvent | React.KeyboardEvent) => {
    if ('key' in event && event.key !== 'Enter') {
      return;
    }

    event.preventDefault();
    if (user) {
      ws.current?.send(
        JSON.stringify({
          type: 'NEW_MESSAGE',
          payload: {
            userId: user._id,
            message: message,
          },
        })
      );

      setMessage('');
    }
  };

  return (
    <div className={'flex gap-4'}>
      <Sidebar onlineUsers={onlineUsers} />

      <div className={'flex flex-col w-full gap-3'}>
        <div
          className={cn(
            'w-full bg-muted h-screen overflow-hidden rounded-xl p-2 border flex flex-col justify-between',
            styles.chat
          )}
        >
          <ul className={'flex flex-col gap-2 overflow-y-scroll h-full rounded-md relative mb-2'}>
            {reverseMessages.length === 0 ? (
              <small
                className={
                  'absolute -translate-x-2/4 -translate-y-2/4 top-1/2 left-1/2 text-nowrap text-muted-foreground'
                }
              >
                No messages yet. Start the conversation by typing in the message box below and pressing Enter.
              </small>
            ) : (
              reverseMessages.map((message) => <Message key={message._id} user={user} message={message} />)
            )}
          </ul>
          <form className={'flex relative'} onSubmit={handleSendMessage}>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleSendMessage}
              rows={3}
              className={'max-h-24 h-full bg-muted focus-visible:ring-0 focus-visible:border-gray-400 resize-none'}
              placeholder={'Enter your message...'}
              required
            />

            <Button type={'submit'} size={'icon'} className={'absolute right-2 bottom-2'}>
              <RocketIcon />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
