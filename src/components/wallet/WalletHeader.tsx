import { useState } from 'react';
import { useWalletStore } from '@/store/walletStore';
import { formatAddress, formatUSD } from '@/lib/utils';
import { CopyIcon, CheckIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const WalletHeader = () => {
  const { currentWallet } = useWalletStore();
  const [copied, setCopied] = useState(false);

  if (!currentWallet) return null;

  // Calculate total wallet value
  const totalValue = currentWallet.tokens.reduce(
    (acc, token) => acc + token.usdValue,
    0
  );

  const copyAddress = () => {
    if (currentWallet.address) {
      navigator.clipboard.writeText(currentWallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="p-4 pb-0">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-semibold text-black dark:text-white">{currentWallet.name}</h1>
        <div className="px-2 py-1 rounded-full bg-gray-200 dark:bg-[#2a2a3a] text-xs text-violet-600 dark:text-violet-300 font-medium">
          {currentWallet.network === 'mainnet' ? 'Mainnet' : 'Devnet'}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <p className="text-gray-700 dark:text-gray-400 text-sm">{formatAddress(currentWallet.address, 6)}</p>
        <button
          onClick={copyAddress}
          className="p-1 rounded-md hover:bg-gray-300 dark:hover:bg-[#1e1e2e] transition-colors"
        >
          {copied ? (
            <CheckIcon className="w-4 h-4 text-green-500" />
          ) : (
            <CopyIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          )}
        </button>
      </div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="bg-gradient-to-r from-violet-100 dark:from-violet-900/20 to-blue-100 dark:to-blue-900/20 rounded-2xl p-5 mb-6 border border-violet-200 dark:border-violet-800/30"
      >
        <p className="text-gray-700 dark:text-gray-400 text-sm mb-2">Total Balance</p>
        <h2 className="text-3xl font-bold text-black dark:text-white mb-1">
          {formatUSD(totalValue)}
        </h2>
      </motion.div>
    </div>
  );
};

export default WalletHeader;
