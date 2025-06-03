import { Token } from '@/types';
import { formatAmount, formatUSD } from '@/lib/utils';
import PriceChart from './PriceChart';
import CardContainer from '@/components/ui/card-container';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTokenPrice } from '@/hooks/useTokenPrice';

interface TokenDetailProps {
  token: Token;
}

const TokenDetail = ({ token }: TokenDetailProps) => {
  // 🐞 Debug: verificar se o coingeckoId está vindo corretamente
  console.log('🪙 coingeckoId:', token.coingeckoId);

  const firstPrice = token.priceHistory[0];
  const lastPrice = token.priceHistory[token.priceHistory.length - 1];
  const priceChange = ((lastPrice - firstPrice) / firstPrice) * 100;
  const isPriceUp = priceChange >= 0;

  const iconUrl = `https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/${token.mintAddress}/logo.png`;

  const realPrice = useTokenPrice(token.coingeckoId ?? '');

  const priceToDisplay = realPrice !== null ? realPrice : token.priceUsd;

  return (
    <div className="p-4">
      <CardContainer className="mb-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-700 p-1 mr-3 overflow-hidden">
            <img 
              src={iconUrl} 
              alt={token.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/default-token-icon.png';
              }}
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">{token.name}</h2>
            <p className="text-zinc-500 dark:text-zinc-400">{token.symbol}</p>
          </div>
        </div>

        <div className="mb-3">
          <h3 className="text-3xl font-bold text-zinc-900 dark:text-white">
            {formatUSD(priceToDisplay)}
          </h3>
          <div className="flex items-center mt-1">
            <div className={`flex items-center ${isPriceUp ? 'text-green-500' : 'text-red-500'}`}>
              {isPriceUp ? (
                <ArrowUp className="w-4 h-4 mr-1" />
              ) : (
                <ArrowDown className="w-4 h-4 mr-1" />
              )}
              <span className="text-sm font-medium">
                {Math.abs(priceChange).toFixed(2)}%
              </span>
            </div>
            <span className="text-sm text-zinc-500 dark:text-zinc-400 ml-2">24h</span>
          </div>
        </div>

        {/* ✅ Gráfico com filtros e preços reais */}
        {token.coingeckoId && (
          <PriceChart tokenId={token.coingeckoId} />
        )}

        <div className="mt-4 p-4 rounded-xl 
                        bg-zinc-100 dark:bg-zinc-900 
                        text-zinc-800 dark:text-white 
                        shadow-md transition-colors duration-300">
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Your Balance</p>
              <p className="text-xl font-semibold">
                {formatAmount(token.balance)} {token.symbol}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Value</p>
              <p className="text-xl font-semibold">
                {formatUSD(priceToDisplay * token.balance)}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link 
              to={`/send?token=${token.symbol}`}
              className="flex-1 py-2.5 flex items-center justify-center rounded-xl 
                         bg-violet-600 hover:bg-violet-700 
                         text-white transition-colors"
            >
              <ArrowUp className="w-4 h-4 mr-1.5" />
              <span>Send</span>
            </Link>
            <Link 
              to="/receive"
              className="flex-1 py-2.5 flex items-center justify-center rounded-xl 
                         bg-zinc-200 hover:bg-zinc-300 
                         dark:bg-zinc-700 dark:hover:bg-zinc-600 
                         text-zinc-800 dark:text-white transition-colors"
            >
              <ArrowDown className="w-4 h-4 mr-1.5" />
              <span>Receive</span>
            </Link>
          </div>
        </div>
      </CardContainer>
    </div>
  );
};

export default TokenDetail;
