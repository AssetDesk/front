import { xdr } from 'soroban-client';
import { Asset } from '../types/asset';
import BigNumber from 'bignumber.js';

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
    address: 'CBXGZ2ZSDGXUJFMXVWG6YZ5W5YC7FDOS27ZTSE7457X7PXSTAKNAV4YV',
    exponents: 6,
    name: 'USDC',
    symbol: 'usdc',
    collateral: false,
    faucet: true,
    maxFaucet: 1000,
  },
  {
    icon: '/weth.svg',
    address: 'CBSP6OCM72CW55KSZR7ZWW4GCRHOT2FVGUZKNPA76FGKMEKTTFQRWHNY',
    exponents: 18,
    name: 'ETH',
    symbol: 'eth',
    collateral: false,
    faucet: true,
    maxFaucet: 1,
  },
];

export const assetsArguments = {
  xlm: [xdr.ScVal.scvSymbol('xlm')],
  usdc: [xdr.ScVal.scvSymbol('usdc')],
  eth: [xdr.ScVal.scvSymbol('eth')],
};

export const assetInitialValue = { xlm: BigNumber(0), usdc: BigNumber(0), eth: BigNumber(0) };
