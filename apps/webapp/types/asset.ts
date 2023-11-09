export interface Asset {
  symbol: string;
  icon: string;
  name: string;
  address: string;
  exponents: number;
  collateral: boolean;
  faucet: boolean;
  maxFaucet?: number;
}
