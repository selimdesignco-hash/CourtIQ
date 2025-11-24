import React from 'react';

export const Input = React.forwardRef(function Input({ className = '', ...props }, ref) {
  return (
    <input
      ref={ref}
      className={`w-full rounded-lg border border-gray-700 bg-black text-white px-3 py-2 focus:outline-none focus:border-orange-500 ${className}`}
      {...props}
    />
  );
});
