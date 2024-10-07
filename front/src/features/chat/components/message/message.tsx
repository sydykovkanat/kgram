import React from 'react';

export const Message: React.FC = () => {
  return (
    <li className={'bg-gray-200 p-2 rounded-md px-3 max-w-max'}>
      <div className={'flex justify-between items-center'}>
        <h3 className={'text-sm font-semibold'}>Kanat</h3>
        <p className={'text-xs text-muted-foreground'}>10:22 PM</p>
      </div>
      <p className={'text-sm'}>
        Hello, how are you? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, quisquam!
      </p>
    </li>
  );
};
