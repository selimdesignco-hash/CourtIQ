import React from 'react';

export const Textarea = React.forwardRef(function Textarea(
  { className = '', ...props },
  ref
) {
  return (
    <textarea
      ref={ref}
      className={`w-full min-h-[120px] rounded-lg border border-gray-700 bg-black text-white px-3 py-2 focus:outline-none focus:border-orange-500 ${className}`}
      {...props}
    />
  );
});
