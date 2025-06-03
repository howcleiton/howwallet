import { useWalletStore } from '@/store/walletStore';
import TokenCard from './TokenCard';
import { motion } from 'framer-motion';

const TokenList = () => {
  const { currentWallet } = useWalletStore();

  if (!currentWallet) return null;

  return (
    <div className="p-4">
      <motion.h2 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-lg font-medium text-black dark:text-white mb-4"
      >
        Tokens
      </motion.h2>
      <div>
        {currentWallet.tokens.map((token, index) => (
          <TokenCard key={token.id} token={token} index={index} />
        ))}
      </div>
    </div>
  );
};

export default TokenList;
