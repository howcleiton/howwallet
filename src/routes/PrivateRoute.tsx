import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useWalletStore } from '@/store/walletStore';

const allowedPaths = ['/create-wallet', '/import-wallet', '/onboarding'];

export default function PrivateRoute() {
  const { currentWallet, hasHydrated } = useWalletStore();
  const location = useLocation();

  const isAllowed = allowedPaths.some(path =>
    location.pathname.startsWith(path)
  );

  if (!hasHydrated) {
    return null; // Evita renderização antes do Zustand carregar
  }

  if (!currentWallet && !isAllowed) {
    return <Navigate to="/create-wallet" replace />;
  }

  return <Outlet />;
}
