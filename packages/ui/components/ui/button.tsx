import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-[0.375rem] md:rounded-[0.5rem] text-[0.875rem] md:text-[1rem] font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:text-light-grey',
  {
    variants: {
      variant: {
        default: 'bg-primary hover:bg-primary-foreground active:bg-[#074DFF] disabled:bg-[#0E1F4B]',
        secondary:
          'border-[3px] border-primary bg-secondary hover:border-primary-foreground hover:bg-primary-foreground active:border-[#074DFF] active:bg-[#074DFF] disabled:border-[#0E1F4B]',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border-[1px] border-[rgba(8,46,143,0.60)] bg-background text-[#E3E3E3] btn bg-secondary hover:border-primary-foreground hover:bg-primary-foreground active:border-[#074DFF] active:bg-[#074DFF] disabled:border-[#0E1F4B]',
        ghost: 'text-[16px] font-bold text-[#E0DDDD]',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-[2.25rem] md:h-[2.75rem] w-[6rem] md:w-[12rem]',
        sm: 'h-9 rounded-md px-3',
        md: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
