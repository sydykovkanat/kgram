import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Button } from '@/components/ui/button';
import { selectUser } from '@/features/users/usersSlice';
import { logout } from '@/features/users/usersThunks';
import { cn } from '@/lib/utils';
import type { OnlineUser } from '@/types';
import { ExitIcon, PersonIcon } from '@radix-ui/react-icons';
import React from 'react';
import styles from './sidebar.module.css';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Props {
  className?: string;
  onlineUsers: OnlineUser[];
}

export const Sidebar: React.FC<Props> = ({ className, onlineUsers }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div
      className={cn(
        'max-w-xs w-full flex flex-col justify-between bg-muted h-screen rounded-xl p-2 pt-0 border',
        styles.sidebar,
        className
      )}
    >
      <main>
        <ul className={'mt-2 flex flex-col gap-2'}>
          {onlineUsers.map((onlineUser) => (
            <li
              key={onlineUser._id}
              className={cn(
                'p-1 px-2 rounded-lg bg-gray-200 text-sm flex items-center gap-1 shadow-card border',
                styles.online
              )}
            >
              <PersonIcon />
              {onlineUser.displayName}
            </li>
          ))}
        </ul>
      </main>
      <footer className={'flex gap-1 bg-gradient-to-l from-gray-200 to-gray-300/50 rounded-md p-2 py-1 items-center'}>
        <h1 className={'text-sm'}>{user?.username}</h1>
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <Button onClick={handleLogout} size={'icon'} className={'size-7 ml-auto'} variant={'ghost'}>
                <ExitIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </footer>
    </div>
  );
};
