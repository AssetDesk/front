import { Account, BASE_FEE, SorobanRpc, scValToNative, xdr } from 'stellar-sdk';
import { useQuery } from '@tanstack/react-query';
import { fetchContractValue } from '../utils/fetch-contract-value';
import { useSorobanReact } from '@soroban-react/core';
import { ContractMethods } from '../types/contract';
import { useMemo } from 'react';
import { ChainName } from '../types/chain';
import BigNumber from 'bignumber.js';
import { sorobanRPC } from '../utils/rpc';

export const useReadContractMultiAssets = <T>(
  contractAddress: string,
  method: ContractMethods,
  initialData: T,
  args: Record<string, xdr.ScVal[]>,
  // set enabled to true only when request need account address
  enabled?: boolean,
) => {
  const { address, activeChain } = useSorobanReact();

  const server = useMemo(() => {
    const chainName = activeChain?.name ?? ChainName.FUTURENET;
    return new SorobanRpc.Server(sorobanRPC[chainName as ChainName], {
      allowHttp: true,
    });
  }, [activeChain]);

  const query = useQuery<T>({
    queryKey: [`multi-${method}`],
    enabled: enabled ?? true,
    initialData,
    queryFn: async () => {
      const res = await Promise.all(
        Object.entries(args).map(async arg => {
          let source;
          if (address && enabled !== false) {
            const account = await server.getAccount(address);
            source = new Account(address, account.sequenceNumber());
          } else {
            source = new Account('GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF', '0');
          }
          try {
            const res = await fetchContractValue({
              server,
              networkPassphrase:
                activeChain?.networkPassphrase ?? 'Test SDF Future Network ; October 2022',
              contractAddress,
              method,
              args: arg[1],
              source,
              fee: BASE_FEE,
            });

            const nativeRes = scValToNative(res.result!.retval) as unknown;

            if (typeof nativeRes === 'bigint') {
              return { [arg[0]]: BigNumber(nativeRes.toString()) } as T;
            }

            return { [arg[0]]: nativeRes } as T;
          } catch (error) {
            console.error(method, error);
            return { [arg[0]]: undefined } as T;
          }
        }),
      ).then(data => {
        let obj = {} as T;
        data.forEach(d => {
          obj = { ...obj, ...d };
        });
        return obj;
      });

      return res;
    },
  });

  return {
    ...query,
    data: query.data ?? initialData,
  };
};
