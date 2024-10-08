import type { MessageApi, User } from '@/types';
import dayjs from 'dayjs';
import React from 'react';

interface Props {
  user: User;
  message: MessageApi;
}

export const Message: React.FC<Props> = ({ message, user }) => {
  return (
    <li
      className={`bg-gray-200 p-2 rounded-md px-3 w-max max-w-lg min-w-64 ${user._id === message.userId._id && 'ml-auto'}`}
    >
      <div className={'flex justify-between items-center w-full'}>
        <h3 className={'text-sm font-medium'}>{message.userId.displayName}</h3>
        <p className={'text-xs text-muted-foreground'}>{dayjs(message.datetime).format('hh:mm MMM YY')}</p>
      </div>
      <p className={'text-sm break-words'}>{message.message}</p>
    </li>
  );
};
