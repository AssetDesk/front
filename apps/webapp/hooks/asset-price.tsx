import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { xdr } from 'soroban-client';
import { ContractMethods } from '../types/contract';
import { CONTRACT_ADDRESS } from '../utils/addresses';
import { formatValue } from '../utils/format-value';
import { useReadContract } from './read-contract';

export const useAssetPrice = (denom: string): BigNumber => {
  const args = useMemo(() => {
    return [xdr.ScVal.scvSymbol(denom)];
  }, [denom]);

  const { data } = useReadContract<BigNumber>(
    CONTRACT_ADDRESS,
    ContractMethods.GET_PRICE,
    BigNumber(0),
    args,
  );

  const price = useMemo(() => {
    return formatValue(data, 8);
  }, [data]);

  return price;
};
