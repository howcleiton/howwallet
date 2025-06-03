import { useState } from 'react';
import { useWalletStore } from '@/store/walletStore';
import TransactionCard from './TransactionCard';
import { TransactionType } from '@/types';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const TransactionsList = ({ tokenSymbol }: { tokenSymbol?: string }) => {
  const { transactions } = useWalletStore();
  const [filter, setFilter] = useState<TransactionType | 'all'>('all');

  const filteredTransactions = transactions.filter(tx => {
    if (tokenSymbol && tx.token !== tokenSymbol) return false;
    if (filter === 'all') return true;
    return tx.type === filter;
  });

  const filters: Array<{ value: TransactionType | 'all', label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'send', label: 'Sent' },
    { value: 'receive', label: 'Received' },
    { value: 'swap', label: 'Swaps' },
    { value: 'stake', label: 'Stakes' }
  ];

  return (
    <div className="p-4">
      <motion.h2 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-lg font-medium text-zinc-900 dark:text-white mb-4"
      >
        Transactions
      </motion.h2>

      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
        {filters.map((item) => (
          <button
            key={item.value}
            onClick={() => setFilter(item.value)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors",
              filter === item.value 
                ? "bg-violet-600 text-white"
                : "bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-gray-300 hover:bg-zinc-300 dark:hover:bg-zinc-700"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {filteredTransactions.length > 0 ? (
        <div>
          {filteredTransactions.map((transaction, index) => (
            <TransactionCard 
              key={transaction.id} 
              transaction={transaction}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-6">
          <p className="text-zinc-500 dark:text-zinc-400">No transactions found</p>
        </div>
      )}
    </div>
  );
};

export default TransactionsList;
