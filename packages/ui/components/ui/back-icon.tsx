import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { IconProps } from '@radix-ui/react-icons/dist/types';
import * as React from 'react';
import { cn } from '../../lib/utils';

export type BackIconProps = IconProps & React.RefAttributes<SVGSVGElement>;

const BackIcon = React.forwardRef<SVGSVGElement, BackIconProps>(({ className, ...props }, ref) => {
  return (
    <ArrowLeftIcon
      className={cn('h-8 w-8 cursor-pointer text-neutral-600 hover:text-white', className)}
      ref={ref}
      {...props}
    ></ArrowLeftIcon>
  );
});

BackIcon.displayName = 'BackIcon';

export { BackIcon };
