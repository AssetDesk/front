import { useSorobanReact } from '@soroban-react/core';
import { useContractValue } from '@soroban-react/contracts';
import { scValToNative, xdr } from 'soroban-client';
import { useServer } from './server';

export const useReadContract = <T>(
  contractAddress: string,
  method: string,
  args?: xdr.ScVal[],
): {
  loading: true | undefined;
  result: T | undefined;
  error: unknown;
} => {
  const sorobanContext = useSorobanReact();

  const server = useServer();

  const { loading, error, result } = useContractValue({
    contractAddress,
    method,
    args: args?.length ? args : undefined,
    sorobanContext: {
      ...sorobanContext,
      server,
    },
  });

  return { loading, error, result: result ? (scValToNative(result) as T) : undefined };
};
