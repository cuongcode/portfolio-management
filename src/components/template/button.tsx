import type { FC, ReactNode } from 'react';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
export const Button: FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button
      type="button"
      className="rounded-md bg-green-500 px-4 py-2 text-white"
      {...rest}
    >
      {children}
    </button>
  );
};
