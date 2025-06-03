import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(address: string, length = 4): string {
  if (!address) return '';
  return `${address.substring(0, length)}...${address.substring(address.length - length)}`;
}

export function formatAmount(amount: number, decimals = 4): string {
  return amount.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(timestamp: number): string {
  return format(new Date(timestamp), 'MMM d, yyyy');
}

export function formatTime(timestamp: number): string {
  return format(new Date(timestamp), 'h:mm a');
}

export function generateMockSeedPhrase(): string[] {
  const words = [
    'abandon', 'ability', 'able', 'about', 'above', 'absent', 'absorb', 'abstract',
    'absurd', 'abuse', 'access', 'accident', 'account', 'accuse', 'achieve', 'acid',
    'acoustic', 'acquire', 'across', 'act', 'action', 'actor', 'actual', 'adapt',
    'add', 'addict', 'address', 'adjust', 'admit', 'adult', 'advance', 'advice',
    'aerobic', 'affair', 'afford', 'afraid', 'again', 'age', 'agent', 'agree',
    'ahead', 'aim', 'air', 'airport', 'aisle', 'alarm', 'album', 'alcohol', 'alert'
  ];
  
  const seedPhrase: string[] = [];
  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    seedPhrase.push(words[randomIndex]);
  }
  
  return seedPhrase;
}

export function generateMockWalletAddress(): string {
  let address = '0x';
  const characters = '0123456789abcdef';
  for (let i = 0; i < 40; i++) {
    address += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return address;
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ✅ Função adicionada para buscar preços reais da CoinGecko
export async function fetchChartPrices(tokenId: string, days: string): Promise<number[][]> {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${tokenId}/market_chart?vs_currency=usd&days=${days}`
  );
  const data = await response.json();
  return data.prices; // formato: [[timestamp, price]]
}
