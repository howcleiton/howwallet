import { Transaction } from '@/types';
import { formatAmount, formatAddress, formatDate, formatTime } from '@/lib/utils';
import { ArrowUpRight, ArrowDownLeft, Repeat, Coins } from 'lucide-react';
import { cn } from '@/lib/utils';
import CardContainer from '@/components/ui/card-container';

interface TransactionCardProps {
  transaction: Transaction;
  index: number;
}

const TransactionCard = ({ transaction, index }: TransactionCardProps) => {
  const { type, status, amount, token, timestamp, address } = transaction;

  const getIcon = () => {
    switch (type) {
      case 'send':
        return ArrowUpRight;
      case 'receive':
        return ArrowDownLeft;
      case 'swap':
        return Repeat;
      case 'stake':
      case 'unstake':
        return Coins;
      default:
        return ArrowUpRight;
    }
  };

  const getIconColor = () => {
    if (status === 'failed') return 'text-red-500';
    if (status === 'pending') return 'text-yellow-500';
    
    switch (type) {
      case 'send':
        return 'text-red-400';
      case 'receive':
        return 'text-green-400';
      case 'swap':
        return 'text-blue-400';
      case 'stake':
      case 'unstake':
        return 'text-purple-400';
      default:
        return 'text-muted-foreground';
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'send':
        return 'Sent';
      case 'receive':
        return 'Received';
      case 'swap':
        return 'Swapped';
      case 'stake':
        return 'Staked';
      case 'unstake':
        return 'Unstaked';
      default:
        return 'Transaction';
    }
  };

  const Icon = getIcon();

  return (
    <CardContainer 
      delay={index}
      className="mb-3 flex items-center justify-between"
    >
      <div className="flex items-center">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center mr-3",
          "bg-muted"
        )}>
          <Icon className={cn("w-5 h-5", getIconColor())} />
        </div>
        
        <div>
          <div className="flex items-center">
            <h3 className="font-medium text-foreground mr-2">{getTitle()}</h3>
            {status === 'pending' && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-900/30 text-yellow-400">
                Pending
              </span>
            )}
            {status === 'failed' && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-red-900/30 text-red-400">
                Failed
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {formatAddress(address)} • {formatDate(timestamp)}
          </p>
        </div>
      </div>
      
      <div className="text-right">
        <p className={cn(
          "font-medium",
          type === 'send' ? "text-red-400" : "text-foreground"
        )}>
          {type === 'send' ? '-' : type === 'receive' ? '+' : ''}{formatAmount(amount)} {token}
        </p>
        <p className="text-xs text-muted-foreground">{formatTime(timestamp)}</p>
      </div>
    </CardContainer>
  );
};

export default TransactionCard;