import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWalletStore } from '@/store/walletStore';
import MobileLayout from '@/components/layout/MobileLayout';
import SectionHeader from '@/components/ui/section-header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CardContainer from '@/components/ui/card-container';
import { formatAddress } from '@/lib/utils';
import { CopyIcon, CheckIcon, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const CreateWalletPage = () => {
  const { createWallet, isWalletLoading } = useWalletStore();
  const [walletName, setWalletName] = useState('My Wallet');
  const [newWallet, setNewWallet] = useState<{ seedPhrase: string[], address: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Reset state when component mounts
    setNewWallet(null);
    setCopied(false);
  }, []);

  const handleCreate = async () => {
    try {
      const wallet = await createWallet(walletName);
      setNewWallet({
        seedPhrase: wallet.seedPhrase || [],
        address: wallet.address
      });
      
      toast({
        title: "Wallet Created",
        description: "Your new wallet has been created successfully",
      });
    } catch (error) {
      toast({
        title: "Wallet Creation Failed",
        description: "There was an error creating your wallet",
        variant: "destructive",
      });
    }
  };

  const copySeedPhrase = () => {
    if (newWallet?.seedPhrase) {
      navigator.clipboard.writeText(newWallet.seedPhrase.join(' '));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const goToWallet = () => {
    navigate('/');
  };

  return (
    <MobileLayout>
      <SectionHeader title="Create Wallet" showBackButton />
      
      <div className="p-4">
        {!newWallet ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CardContainer className="mb-6">
              <h2 className="text-lg font-medium text-white mb-4">Create a New Wallet</h2>
              
              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-2">Wallet Name</label>
                <Input
                  value={walletName}
                  onChange={(e) => setWalletName(e.target.value)}
                  placeholder="My Wallet"
                  className="bg-[#1a1a28] border-[#2d2d3d] text-white"
                />
              </div>
              
              <Button
                onClick={handleCreate}
                className="w-full py-6 bg-violet-600 hover:bg-violet-700 text-white"
                disabled={isWalletLoading}
              >
                {isWalletLoading ? 'Creating...' : 'Create Wallet'}
              </Button>
            </CardContainer>
            
            <div className="text-sm text-gray-400">
              <p className="mb-2">By creating a new wallet, you will:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Generate a new Solana address</li>
                <li>Create a secure 12-word recovery phrase</li>
                <li>Have full control of your digital assets</li>
              </ul>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <CardContainer className="mb-6">
              <h2 className="text-lg font-medium text-white mb-4">Backup Your Recovery Phrase</h2>
              
              <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-900/20 border border-yellow-900/30 mb-4">
                <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <p className="text-sm text-yellow-300">
                  Write these words down and keep them in a safe place!
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-4">
                {newWallet.seedPhrase.map((word, index) => (
                  <div 
                    key={index} 
                    className="p-2 bg-[#1a1a28] border border-[#2d2d3d] rounded-lg text-center"
                  >
                    <span className="text-xs text-gray-500 mr-1">{index + 1}.</span>
                    <span className="text-white">{word}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                className="w-full mb-4 bg-[#252536] hover:bg-[#2d2d46] text-white"
                onClick={copySeedPhrase}
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-4 h-4 mr-2" />
                    Copied to Clipboard
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-4 h-4 mr-2" />
                    Copy Recovery Phrase
                  </>
                )}
              </Button>
              
              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-1">Your Wallet Address</p>
                <div className="px-3 py-2 bg-[#1a1a28] rounded-lg text-white overflow-x-auto font-mono text-sm">
                  {newWallet.address}
                </div>
              </div>
              
              <Button
                onClick={goToWallet}
                className="w-full py-6 bg-violet-600 hover:bg-violet-700 text-white"
              >
                I've Saved My Recovery Phrase
              </Button>
            </CardContainer>
          </motion.div>
        )}
      </div>
    </MobileLayout>
  );
};

export default CreateWalletPage;