import { useMemo } from 'react';
import { ContractMethods } from '../types/contract';
import { CONTRACT_ADDRESS } from '../utils/addresses';
import { useReadContract } from './read-contract';
import { xdr } from 'soroban-client';

export const useAssetPrice = (denom: string) => {
  const args = useMemo(() => {
    return [xdr.ScVal.scvSymbol(denom)];
  }, [denom]);

  const { data } = useReadContract<bigint>(CONTRACT_ADDRESS, ContractMethods.GET_PRICE, 0n, args);

  return data;
};
