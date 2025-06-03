import MobileLayout from '@/components/layout/MobileLayout';
import SectionHeader from '@/components/ui/section-header';
import TransactionsList from '@/components/transaction/TransactionsList';

const ActivityPage = () => {
  return (
    <MobileLayout>
      <SectionHeader title="Activity" />
      <TransactionsList />
    </MobileLayout>
  );
};

export default ActivityPage;
