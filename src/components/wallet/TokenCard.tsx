import { Link } from 'react-router-dom';
import { Token } from '@/types';
import { formatAmount, formatUSD } from '@/lib/utils';
import CardContainer from '@/components/ui/card-container';

interface TokenCardProps {
  token: Token;
  index: number;
}

const TokenCard = ({ token, index }: TokenCardProps) => {
  // Monta a URL do ícone com base no mintAddress da rede Solana
  const iconUrl = `https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/${token.mintAddress}/logo.png`;

  return (
    <Link to={`/token/${token.id}`}>
      <CardContainer 
        delay={index}
        className="flex items-center justify-between mb-3 p-4 hover:bg-[#1a1a28] transition-colors"
      >
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-[#1e1e2e] p-1 mr-3 flex-shrink-0 overflow-hidden">
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
            <h3 className="font-medium text-white">{token.name}</h3>
            <p className="text-sm text-gray-400">{token.symbol}</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="font-medium text-white">
            {formatAmount(token.balance)} {token.symbol}
          </p>
          <p className="text-sm text-gray-400">{formatUSD(token.usdValue)}</p>
        </div>
      </CardContainer>
    </Link>
  );
};

export default TokenCard;
