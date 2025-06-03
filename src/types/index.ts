export type Network = 'mainnet' | 'devnet';

export interface Token {
  id: string;
  name: string;
  symbol: string;
  iconUrl: string;
  balance: number;
  usdValue: number;
  priceUsd: number;
  priceHistory: number[];
  mintAddress: string;
  coingeckoId?: string; // ✅ Adicionado aqui
}

export interface Wallet {
  id: string;
  name: string;
  address: string;
  network: Network;
  tokens: Token[];
  privateKey?: string;
  seedPhrase?: string[];
}

export type TransactionType = 'send' | 'receive' | 'swap' | 'stake' | 'unstake';
export type TransactionStatus = 'success' | 'pending' | 'failed';

export interface Transaction {
  id: string;
  type: TransactionType;
  status: TransactionStatus;
  amount: number;
  token: string;
  timestamp: number;
  address: string;
  fee?: number;
}

export interface DApp {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  category: string;
  url: string;
}
