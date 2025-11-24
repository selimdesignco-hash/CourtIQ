import React, { useState } from 'react';

export function Accordion({ className = '', children }) {
  return <div className={className}>{children}</div>;
}

export function AccordionItem({ value, children }) {
  return <div data-value={value}>{children}</div>;
}

export function AccordionTrigger({ className = '', children, onToggle }) {
  return (
    <button
      type="button"
      className={`w-full text-left flex items-center justify-between gap-2 text-white ${className}`}
      onClick={onToggle}
    >
      {children}
    </button>
  );
}

export function AccordionContent({ className = '', children, open }) {
  if (!open) return null;
  return <div className={`mt-2 text-gray-400 ${className}`}>{children}</div>;
}

export function useAccordionState(defaultOpen = false) {
  const [open, setOpen] = useState(defaultOpen);
  const toggle = () => setOpen((prev) => !prev);
  return { open, toggle };
}
