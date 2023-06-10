import type { ReactNode } from 'react';
import React from 'react';

export const Button = ({ children }: { children: ReactNode }) => {
  return (
    <button
      type="button"
      className="
  rounded-md
  bg-green-500
  px-4 py-2
  text-white
  transition
  delay-150
  duration-300
  hover:-translate-y-1
  hover:scale-110"
    >
      {children}
    </button>
  );
};
