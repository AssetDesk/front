import { Asset } from '../types/asset';
import BigNumber from 'bignumber.js';
import { nativeToScVal } from 'stellar-sdk';

export const assets: Asset[] = [
  {
    symbol: 'xlm',
    icon: '/xlm.png',
    name: 'Stellar',
    address: 'CB64D3G7SM2RTH6JSGG34DDTFTQ5CFDKVDZJZSODMCX4NJ2HV2KN7OHT',
    exponents: 7,
    collateral: true,
    faucet: false,
  },
  {
    icon: '/usdc.svg',
    address: 'CCMQP7ZTAK3R6X2WWSIDIG4Q7V5DS5K2MO6RRU64UFHKZV72TNU4PY4E',
    exponents: 6,
    name: 'USDC',
    symbol: 'usdc',
    collateral: false,
    faucet: true,
    maxFaucet: 1000,
  },
  {
    icon: '/weth.svg',
    address: 'CD2ACTSKG43E67P6BL5BXFHOHKDD7KI4DCMLCFUL5J3QONWI3DPCGKQ4',
    exponents: 18,
    name: 'ETH',
    symbol: 'eth',
    collateral: false,
    faucet: true,
    maxFaucet: 1,
  },
];

export const assetsArguments = {
  xlm: [nativeToScVal('xlm', { type: 'symbol' })],
  usdc: [nativeToScVal('usdc', { type: 'symbol' })],
  eth: [nativeToScVal('eth', { type: 'symbol' })],
};

export const assetInitialValue = { xlm: BigNumber(0), usdc: BigNumber(0), eth: BigNumber(0) };
