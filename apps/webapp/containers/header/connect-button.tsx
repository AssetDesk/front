'use client';
import { useSorobanReact } from '@soroban-react/core';
import { UserPopover } from './user-popover';
import { ConnectorsModal } from './connectors-modal';

export const ConnectButton = () => {
  const { address } = useSorobanReact();

  return <>{!address ? <ConnectorsModal /> : <UserPopover />}</>;
};
