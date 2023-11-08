import { Asset } from '../types/asset';

export const assets: Asset[] = [
  {
    symbol: 'xlm',
    icon: '/xlm.png',
    name: 'Stellar',
    address: 'CB64D3G7SM2RTH6JSGG34DDTFTQ5CFDKVDZJZSODMCX4NJ2HV2KN7OHT',
    exponents: 7,
    collateral: true,
  },
  {
    icon: '/usdc.svg',
    address: 'CA3JV5GEQN4BFK4HUFS52YMETS75NZ6RGXTMQKJSJB4TI7SZFUUIYLCK',
    exponents: 7,
    name: 'TokenA',
    symbol: 'atk',
    collateral: false,
  },
  {
    icon: '/weth.svg',
    address: 'CB4J43EVHXIGZ2ZK7WWQCWXTDRNMJACD7J3EUFTFXMF6LTCCWSD6U3DP',
    exponents: 7,
    name: 'TokenB',
    symbol: 'btk',
    collateral: false,
  },
];
