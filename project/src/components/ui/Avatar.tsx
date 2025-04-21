import React from 'react';
import { cn } from '../../lib/utils';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt = '', size = 'md', fallback, ...props }, ref) => {
    const [hasError, setHasError] = React.useState(false);
    
    const sizes = {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
      xl: "h-16 w-16"
    };

    const getFallbackInitials = () => {
      if (fallback) return fallback;
      if (!alt) return '';
      
      return alt
        .split(' ')
        .map(word => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-full overflow-hidden flex items-center justify-center bg-gray-200",
          sizes[size],
          className
        )}
        {...props}
      >
        {src && !hasError ? (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            onError={() => setHasError(true)}
          />
        ) : (
          <span className="text-gray-600 font-medium">
            {getFallbackInitials()}
          </span>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;