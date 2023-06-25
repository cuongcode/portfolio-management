import type { FC, ReactNode } from 'react';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
export const Button: FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button
      type="button"
      className="rounded-md bg-green-500 px-4 py-2 text-white transition delay-150 duration-300 hover:-translate-y-1 hover:scale-110"
      {...rest}
    >
      {children}
    </button>
  );
};
