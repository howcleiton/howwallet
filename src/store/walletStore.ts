import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Network, Token, Transaction, Wallet } from '@/types';
import { generateMockSeedPhrase, generateMockWalletAddress } from '@/lib/utils';

interface WalletState {
  currentWallet: Wallet | null;
  transactions: Transaction[];
  isWalletLoading: boolean;
  createWallet: (name: string) => Promise<Wallet>;
  importWallet: (seedPhrase: string[], name: string) => Promise<Wallet>;
  selectWallet: (walletId: string) => void;
  changeNetwork: (network: Network) => void;
  sendToken: (tokenSymbol: string, amount: number, recipient: string) => Promise<Transaction>;
}

// Mock token data
const mockTokens: Token[] = [
  {
    id: '1',
    name: 'Solana',
    symbol: 'SOL',
    iconUrl: 'https://cryptologos.cc/logos/solana-sol-logo.png',
    balance: 3.14159,
    usdValue: 345.57,
    priceUsd: 110.0,
    priceHistory: [102, 104, 99, 105, 110, 108, 112, 110, 114, 116, 110]
  },
  {
    id: '2',
    name: 'USD Coin',
    symbol: 'USDC',
    iconUrl: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
    balance: 250.75,
    usdValue: 250.75,
    priceUsd: 1.0,
    priceHistory: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  },
  {
    id: '3',
    name: 'Serum',
    symbol: 'SRM',
    iconUrl: 'https://cryptologos.cc/logos/serum-srm-logo.png',
    balance: 153.25,
    usdValue: 24.52,
    priceUsd: 0.16,
    priceHistory: [0.15, 0.14, 0.16, 0.17, 0.16, 0.17, 0.18, 0.17, 0.16, 0.16, 0.16]
  },
  {
    id: '4',
    name: 'Raydium',
    symbol: 'RAY',
    iconUrl: 'https://cryptologos.cc/logos/raydium-ray-logo.png',
    balance: 42.5,
    usdValue: 17.0,
    priceUsd: 0.4,
    priceHistory: [0.38, 0.39, 0.41, 0.4, 0.42, 0.41, 0.4, 0.39, 0.4, 0.4, 0.4]
  }
];

// Mock transaction data
const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'receive',
    status: 'success',
    amount: 1.5,
    token: 'SOL',
    timestamp: Date.now() - 1000 * 60 * 60 * 2,
    address: '0x123456789abcdef123456789abcdef123456789a'
  },
  {
    id: '2',
    type: 'send',
    status: 'success',
    amount: 0.5,
    token: 'SOL',
    timestamp: Date.now() - 1000 * 60 * 60 * 24,
    address: '0xabcdef123456789abcdef123456789abcdef1234'
  },
  {
    id: '3',
    type: 'swap',
    status: 'success',
    amount: 10,
    token: 'USDC',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2,
    address: '0x0000000000000000000000000000000000000000'
  },
  {
    id: '4',
    type: 'stake',
    status: 'pending',
    amount: 0.2,
    token: 'SOL',
    timestamp: Date.now() - 1000 * 60 * 10,
    address: '0x0000000000000000000000000000000000000000'
  },
  {
    id: '5',
    type: 'receive',
    status: 'success',
    amount: 25,
    token: 'USDC',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 3,
    address: '0x9876543210fedcba9876543210fedcba98765432'
  },
  {
    id: '6',
    type: 'send',
    status: 'failed',
    amount: 0.1,
    token: 'SOL',
    timestamp: Date.now() - 1000 * 60 * 30,
    address: '0xfedcba9876543210fedcba9876543210fedcba98'
  }
];

export const useWalletStore = create<WalletState>()(
  persist(
    (set, get) => ({
      currentWallet: null,
      transactions: mockTransactions,
      isWalletLoading: false,

      createWallet: async (name) => {
        set({ isWalletLoading: true });

        await new Promise(resolve => setTimeout(resolve, 1500));

        const seedPhrase = generateMockSeedPhrase();
        const newWallet: Wallet = {
          id: Date.now().toString(),
          name: name || 'My Wallet',
          address: generateMockWalletAddress(),
          network: 'mainnet',
          tokens: mockTokens,
          seedPhrase
        };

        set({ currentWallet: newWallet, isWalletLoading: false });
        return newWallet;
      },

      importWallet: async (seedPhrase, name) => {
        set({ isWalletLoading: true });

        await new Promise(resolve => setTimeout(resolve, 1500));

        const newWallet: Wallet = {
          id: Date.now().toString(),
          name: name || 'Imported Wallet',
          address: generateMockWalletAddress(),
          network: 'mainnet',
          tokens: mockTokens,
          seedPhrase
        };

        set({ currentWallet: newWallet, isWalletLoading: false });
        return newWallet;
      },

      selectWallet: (walletId) => {
        console.log('Selecting wallet:', walletId);
      },

      changeNetwork: (network) => {
        const { currentWallet } = get();
        if (currentWallet) {
          set({
            currentWallet: {
              ...currentWallet,
              network
            }
          });
        }
      },

      sendToken: async (tokenSymbol, amount, recipient) => {
        set({ isWalletLoading: true });

        await new Promise(resolve => setTimeout(resolve, 1500));

        const newTransaction: Transaction = {
          id: Date.now().toString(),
          type: 'send',
          status: 'success',
          amount,
          token: tokenSymbol,
          timestamp: Date.now(),
          address: recipient
        };

        set(state => ({
          transactions: [newTransaction, ...state.transactions],
          isWalletLoading: false
        }));

        return newTransaction;
      }
    }),
    {
      name: 'how-wallet',
      partialize: (state) => ({
        currentWallet: state.currentWallet,
        transactions: state.transactions
      })
    }
  )
);
