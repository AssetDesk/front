import { useSorobanReact } from '@soroban-react/core';
import { useMemo } from 'react';
import { sorobanRPC } from '../utils/rpc';
import { Account, BASE_FEE, SorobanRpc, scValToNative, xdr } from 'stellar-sdk';
import { ChainName } from '../types/chain';
import { ContractMethods } from '../types/contract';
import { useQuery } from '@tanstack/react-query';
import { fetchContractValue } from '../utils/fetch-contract-value';
import BigNumber from 'bignumber.js';

export const useMultiCall = <T>(
  contractAddress: string,
  methods: { key: string; method: ContractMethods }[],
  initialData: T,
  args?: xdr.ScVal[],
  // set enabled to true only when request need account address
  enabled?: boolean,
  queryKey?: string,
) => {
  const { address, activeChain } = useSorobanReact();
  const server = useMemo(() => {
    const chainName = activeChain?.name ?? ChainName.FUTURENET;
    return new SorobanRpc.Server(sorobanRPC[chainName as ChainName], {
      allowHttp: true,
    });
  }, [activeChain]);

  const query = useQuery<T>({
    queryKey: [queryKey ?? methods.map(i => i.key).join('-')],
    enabled: enabled ?? true,
    initialData,

    queryFn: async () => {
      const res = await Promise.all(
        methods.map(async ({ key, method }) => {
          try {
            let source;
            if (address && enabled !== false) {
              const account = await server.getAccount(address);

              source = new Account(address, account.sequenceNumber());
            } else {
              source = new Account('GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF', '0');
            }
            const res = await fetchContractValue({
              server,
              networkPassphrase: activeChain?.networkPassphrase ?? '',
              contractAddress,
              method,
              args,
              source,
              fee: BASE_FEE,
            });

            const nativeRes = scValToNative(res.result!.retval) as unknown;

            if (typeof nativeRes === 'bigint') {
              return { [key]: BigNumber(nativeRes.toString()) } as T;
            }

            return { [key]: nativeRes } as T;
          } catch (error) {
            console.error(method, error);
            return { [key]: BigNumber(0) } as T;
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
