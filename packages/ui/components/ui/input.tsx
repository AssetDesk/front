import * as React from 'react';

import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const inputVariants = cva(
  'flex w-full rounded-lg border-[1px] bg-transparent px-4 py-2 number2 ring-offset-background placeholder:text-[#B0A8A8] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
  {
    variants: {
      variant: {
        default: 'border-[#0344E9]',
        error: 'border-red-400',
        warn: 'border-yellow-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant, className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        onWheel={e => e.currentTarget.blur()}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
