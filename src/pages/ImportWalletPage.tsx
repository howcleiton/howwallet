import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWalletStore } from '@/store/walletStore';
import MobileLayout from '@/components/layout/MobileLayout';
import SectionHeader from '@/components/ui/section-header';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CardContainer from '@/components/ui/card-container';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ImportWalletPage = () => {
  const { importWallet, isWalletLoading } = useWalletStore();
  const [walletName, setWalletName] = useState('Imported Wallet');
  const [seedPhrase, setSeedPhrase] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [activeTab, setActiveTab] = useState('seed');
  const [validationError, setValidationError] = useState('');

  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = () => {
    if (!walletName.trim()) {
      setValidationError('Wallet name is required');
      return false;
    }

    if (activeTab === 'seed') {
      const words = seedPhrase.trim().split(/\s+/);
      if (words.length !== 12 && words.length !== 24) {
        setValidationError('Recovery phrase must be 12 or 24 words');
        return false;
      }
    } else {
      if (!privateKey.trim() || privateKey.length < 32) {
        setValidationError('Invalid private key format');
        return false;
      }
    }

    setValidationError('');
    return true;
  };

  const handleImport = async () => {
    if (!validateForm()) return;

    try {
      if (activeTab === 'seed') {
        const words = seedPhrase.trim().split(/\s+/);
        await importWallet(words, walletName);
      } else {
        const mockWords = seedPhrase.trim().split(/\s+/) || Array(12).fill('mock');
        await importWallet(mockWords, walletName);
      }

      toast({
        title: 'Wallet Imported',
        description: 'Your wallet has been imported successfully',
      });

      navigate('/wallet');
    } catch (error) {
      toast({
        title: 'Import Failed',
        description: 'There was an error importing your wallet',
        variant: 'destructive',
      });
    }
  };

  return (
    <MobileLayout>
      <SectionHeader title="Import Wallet" showBackButton />

      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] px-4">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <CardContainer className="mb-6">
              <h2 className="text-lg font-medium mb-4">Import Existing Wallet</h2>

              {/* Wallet Name */}
              <div className="mb-4">
                <label className="block text-sm text-muted-foreground mb-2">Wallet Name</label>
                <Input
                  value={walletName}
                  onChange={(e) => setWalletName(e.target.value)}
                  placeholder="My Imported Wallet"
                  className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-black dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400"
                  disabled={isWalletLoading}
                />
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
                <TabsList className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700">
                  <TabsTrigger
                    value="seed"
                    className="flex-1 data-[state=active]:bg-violet-600 data-[state=active]:text-white"
                  >
                    Recovery Phrase
                  </TabsTrigger>
                  <TabsTrigger
                    value="key"
                    className="flex-1 data-[state=active]:bg-violet-600 data-[state=active]:text-white"
                  >
                    Private Key
                  </TabsTrigger>
                </TabsList>

                {/* Recovery Phrase */}
                <TabsContent value="seed" className="mt-4">
                  <label className="block text-sm text-muted-foreground mb-2">
                    Enter your 12 or 24 word recovery phrase
                  </label>
                  <Textarea
                    value={seedPhrase}
                    onChange={(e) => setSeedPhrase(e.target.value)}
                    placeholder="Enter words separated by spaces"
                    className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-black dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 min-h-[120px]"
                    disabled={isWalletLoading}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter all words separated by single spaces
                  </p>
                </TabsContent>

                {/* Private Key */}
                <TabsContent value="key" className="mt-4">
                  <label className="block text-sm text-muted-foreground mb-2">
                    Enter your private key
                  </label>
                  <Input
                    value={privateKey}
                    onChange={(e) => setPrivateKey(e.target.value)}
                    placeholder="Enter your private key"
                    className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-black dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 font-mono"
                    disabled={isWalletLoading}
                  />
                </TabsContent>
              </Tabs>

              {/* Validation error */}
              {validationError && (
                <div className="mb-4 text-sm text-red-400 p-3 rounded-lg bg-red-900/20 border border-red-900/30">
                  {validationError}
                </div>
              )}

              {/* Import Button */}
              <Button
                onClick={handleImport}
                className="w-full py-6 bg-violet-600 hover:bg-violet-700 text-white"
                disabled={isWalletLoading}
              >
                {isWalletLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Importing...
                  </>
                ) : (
                  'Import Wallet'
                )}
              </Button>
            </CardContainer>

            <div className="text-sm text-muted-foreground">
              <p className="mb-2">When importing a wallet:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Make sure you're on the official How Wallet app</li>
                <li>Never share your recovery phrase or private key</li>
                <li>Triple check that you entered the information correctly</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default ImportWalletPage;
