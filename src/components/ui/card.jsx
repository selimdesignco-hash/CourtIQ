import React from 'react';

export function Card({ className = '', children }) {
  return <div className={`rounded-xl border border-gray-800 bg-gray-900/50 ${className}`}>{children}</div>;
}

export function CardHeader({ className = '', children }) {
  return <div className={`px-6 py-4 border-b border-gray-800 ${className}`}>{children}</div>;
}

export function CardTitle({ className = '', children }) {
  return <h3 className={`text-xl font-semibold text-white ${className}`}>{children}</h3>;
}

export function CardContent({ className = '', children }) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}
