import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWalletStore } from '@/store/walletStore';
import MobileLayout from '@/components/layout/MobileLayout';
import SectionHeader from '@/components/ui/section-header';
import SettingsCard from '@/components/settings/SettingsCard';
import { 
  Network, 
  Key, 
  Import, 
  Plus, 
  Moon, 
  Sun,
  AlertTriangle,
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatAddress } from '@/lib/utils';

const SettingsPage = () => {
  const { currentWallet, changeNetwork } = useWalletStore();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  if (!currentWallet) return null;

  const handleNetworkChange = () => {
    const newNetwork = currentWallet.network === 'mainnet' ? 'devnet' : 'mainnet';
    changeNetwork(newNetwork);
    
    toast({
      title: "Network Changed",
      description: `Switched to ${newNetwork === 'mainnet' ? 'Mainnet' : 'Devnet'}`,
    });
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, we would implement theme switching here
    toast({
      title: `${!isDarkMode ? 'Dark' : 'Light'} Mode Enabled`,
      description: `Theme switched to ${!isDarkMode ? 'dark' : 'light'} mode`,
    });
  };

  const handleCreateNewWallet = () => {
    navigate('/create-wallet');
  };

  const handleImportWallet = () => {
    navigate('/import-wallet');
  };

  return (
    <MobileLayout>
      <SectionHeader title="Settings" />
      
      <div className="p-4">
        <h2 className="text-lg font-medium text-white mb-4">Wallet Settings</h2>
        
        <SettingsCard
          icon={<Network className="w-5 h-5 text-blue-400" />}
          title="Network"
          description={currentWallet.network === 'mainnet' ? 'Mainnet' : 'Devnet'}
          onClick={handleNetworkChange}
          index={0}
          rightContent={
            <div className="px-2 py-1 rounded-full bg-[#2a2a3a] text-xs text-violet-300 font-medium">
              {currentWallet.network === 'mainnet' ? 'Mainnet' : 'Devnet'}
            </div>
          }
        />
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div>
              <SettingsCard
                icon={<Key className="w-5 h-5 text-yellow-400" />}
                title="Export Private Key"
                description="View your private key"
                index={1}
              />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-[#14141f] border-[#2d2d3d]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Security Warning</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-400">
                Your private key provides full control of your wallet. Never share it with anyone!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-900/20 border border-yellow-900/30 mb-4">
              <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
              <p className="text-sm text-yellow-300">
                Anyone with your private key can steal your funds!
              </p>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-[#252536] hover:bg-[#2d2d46] text-white border-none">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction 
                className="bg-violet-600 hover:bg-violet-700 text-white"
                onClick={() => {
                  // Simulate private key display
                  toast({
                    title: "Private Key Displayed",
                    description: "Your private key was displayed securely",
                  });
                }}
              >
                I Understand, Show Key
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
        <Dialog>
          <DialogTrigger asChild>
            <div>
              <SettingsCard
                icon={<Key className="w-5 h-5 text-green-400" />}
                title="Recovery Phrase"
                description="View your seed phrase"
                index={2}
              />
            </div>
          </DialogTrigger>
          <DialogContent className="bg-[#14141f] border-[#2d2d3d]">
            <DialogHeader>
              <DialogTitle className="text-white">Recovery Phrase</DialogTitle>
              <DialogDescription className="text-gray-400">
                These 12 words are the keys to your wallet. Keep them in a safe place!
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-900/20 border border-yellow-900/30 mb-4">
              <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
              <p className="text-sm text-yellow-300">
                Never share your recovery phrase with anyone!
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mb-4">
              {currentWallet.seedPhrase?.map((word, index) => (
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
              className="w-full bg-violet-600 hover:bg-violet-700 text-white"
              onClick={() => {
                if (currentWallet.seedPhrase) {
                  navigator.clipboard.writeText(currentWallet.seedPhrase.join(' '));
                  toast({
                    title: "Copied to Clipboard",
                    description: "Recovery phrase copied",
                  });
                }
              }}
            >
              Copy to Clipboard
            </Button>
          </DialogContent>
        </Dialog>
        
        <SettingsCard
          icon={<Import className="w-5 h-5 text-purple-400" />}
          title="Import Wallet"
          description="Import from seed phrase or private key"
          onClick={handleImportWallet}
          index={3}
        />
        
        <SettingsCard
          icon={<Plus className="w-5 h-5 text-blue-400" />}
          title="Create New Wallet"
          description="Generate a new wallet"
          onClick={handleCreateNewWallet}
          index={4}
        />

        <h2 className="text-lg font-medium text-white mt-6 mb-4">App Settings</h2>
        
        <SettingsCard
          icon={isDarkMode ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-yellow-400" />}
          title="Dark Mode"
          description={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          index={5}
          rightContent={
            <Switch
              checked={isDarkMode}
              onCheckedChange={handleThemeToggle}
            />
          }
        />
        
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>How Wallet v1.0.0</p>
          <p className="mt-1">Wallet Address: {formatAddress(currentWallet.address)}</p>
        </div>
      </div>
    </MobileLayout>
  );
};

export default SettingsPage;