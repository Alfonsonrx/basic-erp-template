"use client";

import React from 'react';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'ghost' | 'outline' | 'secondary';
  size?: 'sm' | 'lg';
};

const variants = {
  ghost: 'bg-transparent hover:bg-muted/20 text-foreground',
  outline:
    'border border-input bg-background hover:bg-muted/10 text-foreground',
  secondary:
    'bg-primary hover:bg-primary/90 text-primary-foreground rounded-md',
};

export const Button = ({
  variant = 'ghost',
  size = 'sm',
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`
        inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none
        ${size === 'sm' ? 'h-8 px-3 text-sm' : ''}
        ${size === 'lg' ? 'h-10 px-4 text-base' : ''}
        ${variants[variant]}
        ${className ?? ''}`
      }
      {...props}
    />
  );
};