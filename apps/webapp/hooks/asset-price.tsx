import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { xdr } from 'soroban-client';
import { ContractMethods } from '../types/contract';
import { CONTRACT_ADDRESS, USDC_EXPONENT } from '../utils/constants';
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
    undefined,
    `${ContractMethods.GET_PRICE}-${denom}`
  );

  const price = useMemo(() => {
    return formatValue(data, USDC_EXPONENT);
  }, [data]);

  return price;
};
