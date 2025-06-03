import { Token } from '@/types';
import { formatAmount, formatUSD } from '@/lib/utils';
import PriceChart from './PriceChart';
import CardContainer from '@/components/ui/card-container';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TokenDetailProps {
  token: Token;
}

const TokenDetail = ({ token }: TokenDetailProps) => {
  // Calculate price change
  const firstPrice = token.priceHistory[0];
  const lastPrice = token.priceHistory[token.priceHistory.length - 1];
  const priceChange = ((lastPrice - firstPrice) / firstPrice) * 100;
  const isPriceUp = priceChange >= 0;

  return (
    <div className="p-4">
      <CardContainer className="mb-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-[#1e1e2e] p-1 mr-3 overflow-hidden">
            <img 
              src={token.iconUrl} 
              alt={token.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48?text=' + token.symbol;
              }}
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">{token.name}</h2>
            <p className="text-gray-400">{token.symbol}</p>
          </div>
        </div>

        <div className="mb-3">
          <h3 className="text-3xl font-bold text-white">{formatUSD(token.priceUsd)}</h3>
          <div className="flex items-center mt-1">
            <div className={`flex items-center ${isPriceUp ? 'text-green-400' : 'text-red-400'}`}>
              {isPriceUp ? (
                <ArrowUp className="w-4 h-4 mr-1" />
              ) : (
                <ArrowDown className="w-4 h-4 mr-1" />
              )}
              <span className="text-sm font-medium">
                {Math.abs(priceChange).toFixed(2)}%
              </span>
            </div>
            <span className="text-sm text-gray-400 ml-2">24h</span>
          </div>
        </div>

        <PriceChart token={token} />

        <div className="bg-[#1a1a28] rounded-xl p-4">
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">Your Balance</p>
              <p className="text-xl font-semibold text-white">{formatAmount(token.balance)} {token.symbol}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400 mb-1">Value</p>
              <p className="text-xl font-semibold text-white">{formatUSD(token.usdValue)}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link 
              to={`/send?token=${token.symbol}`}
              className="flex-1 py-2.5 flex items-center justify-center rounded-xl bg-violet-600 hover:bg-violet-700 text-white transition-colors"
            >
              <ArrowUp className="w-4 h-4 mr-1.5" />
              <span>Send</span>
            </Link>
            <Link 
              to="/receive"
              className="flex-1 py-2.5 flex items-center justify-center rounded-xl bg-[#252536] hover:bg-[#2d2d46] text-white transition-colors"
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