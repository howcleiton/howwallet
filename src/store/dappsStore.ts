import { create } from 'zustand';
import { DApp } from '@/types';

interface DAppState {
  dapps: DApp[];
  isLoading: boolean;
  fetchDApps: () => Promise<void>;
}

// Mock DApps data
const mockDApps: DApp[] = [
  {
    id: '1',
    name: 'Magic Eden',
    description: 'NFT marketplace for buying, selling, and creating digital collectibles',
    iconUrl: 'https://magiceden.io/favicon.ico',
    category: 'NFT',
    url: 'https://magiceden.io/'
  },
  {
    id: '2',
    name: 'Jupiter Swap',
    description: 'Leading Solana DEX aggregator for best swap rates',
    iconUrl: 'https://jup.ag/favicon.ico',
    category: 'DEX',
    url: 'https://jup.ag/'
  },
  {
    id: '3',
    name: 'Orca',
    description: 'User-friendly decentralized exchange for Solana assets',
    iconUrl: 'https://www.orca.so/favicon.ico',
    category: 'DEX',
    url: 'https://www.orca.so/'
  },
  {
    id: '4',
    name: 'Marinade Finance',
    description: 'Liquid staking protocol for earning passive yield on Solana',
    iconUrl: 'https://marinade.finance/favicon.ico',
    category: 'Staking',
    url: 'https://marinade.finance/'
  },
  {
    id: '5',
    name: 'Solend',
    description: 'Lending and borrowing protocol for Solana assets',
    iconUrl: 'https://solend.fi/favicon.ico',
    category: 'Lending',
    url: 'https://solend.fi/'
  },
  {
    id: '6',
    name: 'Step Finance',
    description: 'Portfolio dashboard for tracking and managing Solana assets',
    iconUrl: 'https://step.finance/favicon.ico',
    category: 'Analytics',
    url: 'https://step.finance/'
  },
  {
    id: '7',
    name: 'Mango Markets',
    description: 'Decentralized trading platform with perpetual futures',
    iconUrl: 'https://mango.markets/favicon.ico',
    category: 'Trading',
    url: 'https://mango.markets/'
  },
  {
    id: '8',
    name: 'Saber',
    description: 'Stablecoin exchange on Solana with low fees and slippage',
    iconUrl: 'https://saber.so/favicon.ico',
    category: 'Stablecoins',
    url: 'https://saber.so/'
  }
];

export const useDAppsStore = create<DAppState>((set) => ({
  dapps: mockDApps,
  isLoading: false,
  
  fetchDApps: async () => {
    set({ isLoading: true });
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    set({ dapps: mockDApps, isLoading: false });
  }
}));