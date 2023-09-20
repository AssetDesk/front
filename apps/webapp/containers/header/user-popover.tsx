import { useSorobanReact } from '@soroban-react/core';
import React from 'react';
import { Button, CopyToClipboard, Popover, PopoverContent, PopoverTrigger } from 'ui';

export const UserPopover = () => {
  const { address } = useSorobanReact();

  if (!address) return <></>;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          {address.slice(0, 4)}...{address.slice(-4)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <p className='subtitle2'>Active</p>
          {/* //TODO onDisconnet doesnt work */}
          {/* <Button
            variant='ghost'
            size='sm'
            className='text-primary'
            onClick={() => {
              console.log('there');
              
              void (async () => await disconnect())();
            }}
          >
            Disconnect
          </Button> */}
        </div>
        <div className='border-primary flex h-11 items-center justify-between border-l pl-3'>
          <p className='btn'>
            {address.slice(0, 4)}...{address.slice(-4)}
          </p>
          <CopyToClipboard text={address} />
        </div>
      </PopoverContent>
    </Popover>
  );
};
