import { Chat } from '@/features/chat/chat';
import { Login } from '@/features/users/login';
import { Register } from '@/features/users/register';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <div className={'container mx-auto p-4'}>
      <Routes>
        <Route path={'/'} element={<Chat />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/register'} element={<Register />} />
      </Routes>
    </div>
  );
};
