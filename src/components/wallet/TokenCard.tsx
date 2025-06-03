import { Link } from 'react-router-dom';
import { Token } from '@/types';
import { formatAmount, formatUSD } from '@/lib/utils';
import CardContainer from '@/components/ui/card-container';

interface TokenCardProps {
  token: Token;
  index: number;
}

const TokenCard = ({ token, index }: TokenCardProps) => {
  const iconUrl = `https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/${token.mintAddress}/logo.png`;

  return (
    <Link to={`/token/${token.id}`}>
      <CardContainer 
        delay={index}
        className="flex items-center justify-between mb-3 p-4 hover:bg-[#1a1a28] dark:hover:bg-[#1a1a28] hover:bg-zinc-100 transition-colors"
      >
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-transparent p-0 mr-3 flex-shrink-0 overflow-hidden">
            <img 
              src={iconUrl}
              alt={token.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes('default-token.png')) {
                  target.src = '/icons/default-token.png';
                }
              }}
            />
          </div>
          
          <div>
            <h3 className="font-medium text-zinc-900 dark:text-white">{token.name}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{token.symbol}</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="font-medium text-zinc-900 dark:text-white">
            {formatAmount(token.balance)} {token.symbol}
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{formatUSD(token.usdValue)}</p>
        </div>
      </CardContainer>
    </Link>
  );
};

export default TokenCard;
