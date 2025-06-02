import { Link } from 'react-router-dom';
import { Token } from '@/types';
import { formatAmount, formatUSD } from '@/lib/utils';
import { motion } from 'framer-motion';
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
        className="flex items-center justify-between mb-3 p-4 hover:bg-[#1a1a28] transition-colors"
      >
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-[#1e1e2e] p-1 mr-3 flex-shrink-0 overflow-hidden">
            <img 
              src={token.iconUrl} 
              alt={token.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                // Fallback if image fails to load
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40?text=' + token.symbol;
              }}
            />
          </div>
          
          <div>
            <h3 className="font-medium text-white">{token.name}</h3>
            <p className="text-sm text-gray-400">{token.symbol}</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="font-medium text-white">{formatAmount(token.balance)} {token.symbol}</p>
          <p className="text-sm text-gray-400">{formatUSD(token.usdValue)}</p>
        </div>
      </CardContainer>
    </Link>
  );
};

export default TokenCard;