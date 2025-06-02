import { useParams, useNavigate } from 'react-router-dom';
import { useWalletStore } from '@/store/walletStore';
import MobileLayout from '@/components/layout/MobileLayout';
import SectionHeader from '@/components/ui/section-header';
import TokenDetail from '@/components/wallet/TokenDetail';
import TransactionsList from '@/components/transaction/TransactionsList';

const TokenDetailPage = () => {
  const { tokenId } = useParams<{ tokenId: string }>();
  const { currentWallet } = useWalletStore();
  const navigate = useNavigate();

  if (!currentWallet) {
    navigate('/');
    return null;
  }

  const token = currentWallet.tokens.find(t => t.id === tokenId);

  if (!token) {
    navigate('/');
    return null;
  }

  return (
    <MobileLayout>
      <SectionHeader title={token.name} showBackButton />
      <TokenDetail token={token} />
      <TransactionsList tokenSymbol={token.symbol} />
    </MobileLayout>
  );
};

export default TokenDetailPage;