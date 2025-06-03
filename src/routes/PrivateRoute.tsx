import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useWalletStore } from '@/store/walletStore';

const allowedPaths = ['/create-wallet', '/import-wallet', '/onboarding'];

export default function PrivateRoute() {
  const { currentWallet, hasHydrated } = useWalletStore();
  const location = useLocation();

  // Aguarda Zustand carregar para evitar loops
  if (!hasHydrated) {
    return null; // ou <div>Loading...</div>
  }

  const isAllowed = allowedPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  if (!currentWallet && !isAllowed) {
    return <Navigate to="/create-wallet" replace />;
  }

  return <Outlet />;
}
