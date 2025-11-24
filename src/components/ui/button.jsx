import React from 'react';

export const Button = React.forwardRef(function Button(
  { className = '', variant = 'default', children, ...props },
  ref
) {
  const variants = {
    default:
      'bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-4 py-2 transition-colors',
    outline:
      'border border-gray-700 hover:border-orange-500 text-white rounded-lg px-4 py-2 bg-transparent transition-colors',
  };

  const variantClass = variants[variant] || variants.default;

  return (
    <button ref={ref} className={`${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
});
