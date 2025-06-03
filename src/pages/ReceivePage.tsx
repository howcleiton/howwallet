import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useWalletStore } from '@/store/walletStore';
import MobileLayout from '@/components/layout/MobileLayout';
import SectionHeader from '@/components/ui/section-header';
import { CopyIcon, CheckIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const ReceivePage = () => {
  const { currentWallet } = useWalletStore();
  const [copied, setCopied] = useState(false);
  const [selectedToken, setSelectedToken] = useState(
    currentWallet?.tokens[0]?.symbol || ''
  );

  if (!currentWallet) return null;

  const copyAddress = () => {
    navigator.clipboard.writeText(currentWallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <MobileLayout>
      <SectionHeader title="Receive" showBackButton />
      
      <div className="p-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-4 mb-6 transition-colors"
        >
          <div className="mb-4">
            <label className="block text-sm text-zinc-700 dark:text-zinc-300 mb-2">Select Token</label>
            <Select value={selectedToken} onValueChange={setSelectedToken}>
              <SelectTrigger className="w-full" >
                <SelectValue placeholder="Select a token" />
              </SelectTrigger>
              <SelectContent>
                {currentWallet.tokens.map(token => (
                  <SelectItem key={token.id} value={token.symbol}>
                    <div className="flex items-center">
                      <img
                        src={token.iconUrl}
                        alt={token.name}
                        className="w-5 h-5 mr-2"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      <span>{token.symbol}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-col items-center py-4">
            <div className="p-4 bg-white dark:bg-white rounded-2xl mb-4">
              <QRCodeSVG
                value={currentWallet.address}
                size={200}
                bgColor={'#ffffff'}
                fgColor={'#000000'}
                level={'L'}
                includeMargin={false}
              />
            </div>

            <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-3">
              Your {selectedToken} Address
            </p>

            <div className="flex items-center gap-2 mb-6">
              <div className="px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-800 dark:text-white overflow-x-auto max-w-full">
                <p className="whitespace-nowrap font-mono">{currentWallet.address}</p>
              </div>
              <button
                onClick={copyAddress}
                className="p-3 rounded-lg bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
              >
                {copied ? (
                  <CheckIcon className="w-5 h-5 text-green-500" />
                ) : (
                  <CopyIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                )}
              </button>
            </div>
          </div>
        </motion.div>

        <div className="bg-blue-100 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-900/30 rounded-lg p-4 text-sm text-blue-800 dark:text-blue-300">
          <p className="font-medium mb-1">Important</p>
          <p>
            Only send <span className="font-semibold">{selectedToken}</span> to this address. Sending any other asset may result in permanent loss.
          </p>
        </div>
      </div>
    </MobileLayout>
  );
};

export default ReceivePage;
