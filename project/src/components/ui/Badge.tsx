import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const variants = {
      default: "bg-blue-100 text-blue-800",
      secondary: "bg-gray-100 text-gray-800",
      outline: "border border-gray-300 text-gray-700",
      success: "bg-green-100 text-green-800",
      warning: "bg-yellow-100 text-yellow-800",
      danger: "bg-red-100 text-red-800"
    };
    
    const sizes = {
      sm: "text-xs px-2 py-0.5",
      md: "text-sm px-2.5 py-0.5"
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full font-medium",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;