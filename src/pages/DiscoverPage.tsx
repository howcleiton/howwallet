import { useEffect } from 'react';
import MobileLayout from '@/components/layout/MobileLayout';
import SectionHeader from '@/components/ui/section-header';
import { useDAppsStore } from '@/store/dappsStore';
import DAppCard from '@/components/discover/DAppCard';
import { Loader2 } from 'lucide-react';

const DiscoverPage = () => {
  const { dapps, isLoading, fetchDApps } = useDAppsStore();

  useEffect(() => {
    fetchDApps();
  }, [fetchDApps]);

  return (
    <MobileLayout>
      <SectionHeader title="Discover" />
      
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-black dark:text-white mb-1">
            DApps
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-400">
            Explore decentralized applications on Solana
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
          </div>
        ) : (
          <div>
            {dapps.map((dapp, index) => (
              <DAppCard key={dapp.id} dapp={dapp} index={index} />
            ))}
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default DiscoverPage;
