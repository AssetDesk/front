import { useSorobanReact } from '@soroban-react/core';
import { useMemo } from 'react';
import { Server } from 'soroban-client';
import { ChainName } from '../types/chain';

const sorobanRPC: Record<ChainName, string> = {
  Futurenet: 'https://rpc-futurenet.stellar.org:443',
};

export const useServer = () => {
  const { activeChain } = useSorobanReact();

  const server = useMemo(() => {
    const chainName = activeChain?.name ?? ChainName.FUTURENET;
    return new Server(sorobanRPC[chainName as ChainName], {
      allowHttp: true,
    });
  }, [activeChain]);

  return server;
};
