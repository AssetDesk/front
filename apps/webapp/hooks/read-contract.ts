import { Account, Server, scValToNative, xdr } from 'soroban-client';
import { useQuery } from '@tanstack/react-query';
import { fetchContractValue } from '../utils/fetch-contract-value';
import { useSorobanReact } from '@soroban-react/core';
import { ContractMethods } from '../types/contract';
import { useMemo } from 'react';
import { ChainName } from '../types/chain';

const sorobanRPC: Record<ChainName, string> = {
  Futurenet: 'https://rpc-futurenet.stellar.org:443',
};

export const useReadContract = <T>(
  contractAddress: string,
  method: ContractMethods,
  args?: xdr.ScVal[],
  // set enabled to true only when request need account address
  enabled?: boolean,
) => {
  const { address, activeChain } = useSorobanReact();

  const server = useMemo(() => {
    const chainName = activeChain?.name ?? ChainName.FUTURENET;
    return new Server(sorobanRPC[chainName as ChainName], {
      allowHttp: true,
    });
  }, [activeChain]);

  const source = useMemo(() => {
    if (address && enabled !== false) return new Account(address, '0');

    // use default address if user doesn`t coonnect
    return new Account('GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF', '0');
  }, [address, enabled]);

  const query = useQuery<T>({
    queryKey: [method],
    enabled: enabled ?? true,
    queryFn: async () => {
      const res = await fetchContractValue({
        server,
        networkPassphrase: activeChain?.networkPassphrase ?? '',
        contractAddress,
        method,
        args,
        source,
      });

      return scValToNative(res) as T;
    },
  });

  return query;
};
