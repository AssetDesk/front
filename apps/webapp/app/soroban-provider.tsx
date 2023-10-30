import { SorobanReactProvider } from '@soroban-react/core';
import React from 'react';
import { allowedChains } from '../soroban/allowedChains';
import { allowedConnectors } from '../soroban/connectors';

const SorobanProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SorobanReactProvider
      appName='AssetDesk'
      autoconnect
      chains={allowedChains}
      connectors={allowedConnectors}
    >
      {children}
    </SorobanReactProvider>
  );
};
export default SorobanProvider;
