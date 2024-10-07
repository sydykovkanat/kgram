import { cn } from '@/lib/utils';
import { PersonIcon } from '@radix-ui/react-icons';
import React from 'react';
import styles from './sidebar.module.css';

interface Props {
  className?: string;
}

export const Sidebar: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('max-w-xs w-full bg-muted h-screen rounded-xl p-2 pt-0 border', styles.sidebar, className)}>
      <main>
        <ul className={'mt-2'}>
          <li
            className={cn('p-1 px-2 rounded-lg bg-gray-200 text-sm flex items-center gap-1 shadow-card', styles.online)}
          >
            <PersonIcon />
            Kanat
          </li>
        </ul>
      </main>
    </div>
  );
};
