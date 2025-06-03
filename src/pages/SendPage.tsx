import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useWalletStore } from '@/store/walletStore';
import MobileLayout from '@/components/layout/MobileLayout';
import SectionHeader from '@/components/ui/section-header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatAddress, formatAmount, formatUSD } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SendPage = () => {
  const { currentWallet, sendToken, isWalletLoading } = useWalletStore();
  const [searchParams] = useSearchParams();
  const defaultToken = searchParams.get('token') || '';
  const navigate = useNavigate();
  const { toast } = useToast();

  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState(defaultToken);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (!currentWallet) {
      navigate('/');
    }
  }, [currentWallet, navigate]);

  if (!currentWallet) return null;

  const token = currentWallet.tokens.find(t => t.symbol === selectedToken);
  const maxAmount = token?.balance || 0;
  const usdValue = token ? parseFloat(amount || '0') * token.priceUsd : 0;

  const validateForm = () => {
    if (!recipient.trim()) {
      setValidationError('Recipient address is required');
      return false;
    }

    if (recipient.length < 32) {
      setValidationError('Invalid wallet address');
      return false;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setValidationError('Amount must be greater than 0');
      return false;
    }

    if (!selectedToken) {
      setValidationError('Please select a token');
      return false;
    }

    if (parseFloat(amount) > maxAmount) {
      setValidationError(`Insufficient balance. Max: ${maxAmount} ${selectedToken}`);
      return false;
    }

    setValidationError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await sendToken(selectedToken, parseFloat(amount), recipient);
      
      toast({
        title: "Transaction Sent",
        description: `You sent ${amount} ${selectedToken} to ${formatAddress(recipient)}`,
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: "Transaction Failed",
        description: "There was an error sending your transaction",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MobileLayout>
      <SectionHeader title="Send" showBackButton />
      
      <form onSubmit={handleSubmit} className="p-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#14141f] border border-[#2d2d3d]/50 rounded-2xl p-4 mb-6"
        >
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Select Token</label>
            <Select
              value={selectedToken}
              onValueChange={setSelectedToken}
              disabled={isSubmitting}
            >
              <SelectTrigger className="w-full bg-[#1a1a28] border-[#2d2d3d]">
                <SelectValue placeholder="Select a token" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a28] border-[#2d2d3d]">
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
                      <span className="ml-2 text-gray-400">
                        ({formatAmount(token.balance)})
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Recipient Address</label>
            <Input
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter wallet address"
              className="bg-[#1a1a28] border-[#2d2d3d] text-white"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="mb-2">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm text-gray-400">Amount</label>
              {token && (
                <button
                  type="button"
                  onClick={() => setAmount(maxAmount.toString())}
                  className="text-xs text-violet-400 hover:text-violet-300"
                  disabled={isSubmitting}
                >
                  Max: {formatAmount(maxAmount)} {selectedToken}
                </button>
              )}
            </div>
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
              placeholder="0.00"
              type="text"
              inputMode="decimal"
              className="bg-[#1a1a28] border-[#2d2d3d] text-white text-xl"
              disabled={isSubmitting}
            />
            {token && (
              <p className="text-sm text-gray-400 mt-1">
                ≈ {formatUSD(usdValue)}
              </p>
            )}
          </div>
        </motion.div>
        
        {validationError && (
          <div className="mb-4 text-sm text-red-400 p-3 rounded-lg bg-red-900/20 border border-red-900/30">
            {validationError}
          </div>
        )}
        
        <Button
          type="submit"
          className="w-full py-6 bg-violet-600 hover:bg-violet-700 text-white"
          disabled={isSubmitting || isWalletLoading}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            'Send Transaction'
          )}
        </Button>
      </form>
    </MobileLayout>
  );
};

export default SendPage;
