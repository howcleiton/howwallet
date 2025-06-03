import { Link } from 'react-router-dom';
import { Token } from '@/types';
import { formatAmount, formatUSD } from '@/lib/utils';
import CardContainer from '@/components/ui/card-container';

interface TokenCardProps {
  token: Token;
  index: number;
}

const TokenCard = ({ token, index }: TokenCardProps) => {
  return (
    <Link to={`/token/${token.id}`}>
      <CardContainer 
        delay={index}
        className="flex items-center justify-between mb-3 p-4 
                   bg-white dark:bg-zinc-800
                   hover:bg-zinc-100 dark:hover:bg-zinc-700 
                   transition-colors duration-300 rounded-xl shadow-md"
      >
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 p-1 mr-3 flex-shrink-0 overflow-hidden">
            <img 
              src={token.iconUrl} 
              alt={token.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
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
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {formatUSD(token.usdValue)}
          </p>
        </div>
      </CardContainer>
    </Link>
  );
};

export default TokenCard;
