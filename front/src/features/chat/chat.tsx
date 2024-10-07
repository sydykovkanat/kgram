import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Sidebar } from '@/features/chat/components/sidebar/sidebar';
import { selectUser } from '@/features/users/usersSlice';
import { logout } from '@/features/users/usersThunks';
import { cn } from '@/lib/utils';
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

      <div className={cn('w-full bg-muted h-screen rounded-xl p-2 border', styles.chat)}>
        <button onClick={handleLogout} className={'bg-red-500 text-white p-2 rounded-lg'}>
          Logout
        </button>
      </div>
    </div>
  );
};
