import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWalletStore } from '@/store/walletStore';
import MobileLayout from '@/components/layout/MobileLayout';
import WalletHeader from '@/components/wallet/WalletHeader';
import ActionButtons from '@/components/wallet/ActionButtons';
import TokenList from '@/components/wallet/TokenList';
import { Button } from '@/components/ui/button';

const WalletPage = () => {
  const { currentWallet, createWallet } = useWalletStore();
  const navigate = useNavigate();

  useEffect(() => {
    // If no wallet exists, create a default one
    if (!currentWallet) {
      createWallet('My Wallet');
    }
  }, [currentWallet, createWallet]);

  if (!currentWallet) {
    return (
      <MobileLayout className="flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold text-white mb-4">Welcome to How Wallet</h1>
        <p className="text-gray-400 text-center mb-8">
          Your digital asset wallet with a beautiful, intuitive interface
        </p>
        
        <div className="flex flex-col gap-3 w-full">
          <Button 
            onClick={() => navigate('/create-wallet')}
            className="w-full py-6 bg-violet-600 hover:bg-violet-700 text-white"
          >
            Create a New Wallet
          </Button>
          
          <Button
            onClick={() => navigate('/import-wallet')}
            variant="outline"
            className="w-full py-6 bg-transparent border-violet-600/30 text-violet-300 hover:bg-violet-900/10"
          >
            Import Existing Wallet
          </Button>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <WalletHeader />
      <ActionButtons />
      <TokenList />
    </MobileLayout>
  );
};

export default WalletPage;