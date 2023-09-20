import React from 'react';
import { SorobanReactProvider } from '@soroban-react/core';
import { allowedChains } from './allowedChains';
import { allowedConnectors } from './connectors';

const SorobanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
