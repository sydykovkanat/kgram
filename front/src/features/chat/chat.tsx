import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Message } from '@/features/chat/components/message/message';
import { Sidebar } from '@/features/chat/components/sidebar/sidebar';
import { selectUser } from '@/features/users/usersSlice';
import { logout } from '@/features/users/usersThunks';
import { cn } from '@/lib/utils';
import { RocketIcon } from '@radix-ui/react-icons';
import { SendIcon } from 'lucide-react';
import React, { useEffect } from 'react';
import styles from './chat.module.css';
import { useNavigate } from 'react-router-dom';

export const Chat: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate('/login');
    }
  }, [navigate, user]);

  if (user === null) {
    return (
      <p className={'text-sm text-muted-foreground absolute -translate-x-2/4 -translate-y-2/4 top-1/2 left-1/2'}>
        Please log in before visiting the site.
      </p>
    );
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={'flex gap-4'}>
      <Sidebar />

      <div className={'flex flex-col w-full gap-3'}>
        <div
          className={cn(
            'w-full bg-muted h-screen overflow-hidden rounded-xl p-2 border flex flex-col justify-between',
            styles.chat
          )}
        >
          <ul className={'flex flex-col gap-2 overflow-y-scroll h-full rounded-md'}>
            <Message />
          </ul>
          <div className={'flex relative'}>
            <Textarea
              rows={3}
              className={'max-h-24 h-full bg-muted focus-visible:ring-0 focus-visible:border-gray-400 resize-none'}
              placeholder={'Enter your message...'}
            />
            <Button size={'icon'} className={'absolute right-2 bottom-2'}>
              <RocketIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
