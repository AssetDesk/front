'use client';

import * as React from 'react';
import { useState } from 'react';
// import { CheckCircledIcon, CopyIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import { cn } from '../lib/utils';
import { CheckCircle, CopyIcon } from 'lucide-react';

export interface CopyToClipboardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const CopyToClipboard = React.forwardRef<HTMLButtonElement, CopyToClipboardProps>(
  ({ text, className, ...props }, ref) => {
    const [copied, setCopied] = useState(false);

    return (
      <Button
        className={cn(copied && 'cursor-default text-teal-500 hover:no-underline', className)}
        variant='link'
        ref={ref}
        size='sm'
        onClick={() => {
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 2000);
          void navigator.clipboard.writeText(text);
        }}
        {...props}
      >
        {copied ? (
          <span>
            <CheckCircle className='h-4 w-4' />
          </span>
        ) : (
          <span>
            <CopyIcon className='h-4 w-4 text-[#E3E3E3] hover:opacity-50' />
          </span>
        )}
      </Button>
    );
  },
);
CopyToClipboard.displayName = 'CopyToClipboard';

export { CopyToClipboard };
