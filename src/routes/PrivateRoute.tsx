import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useWalletStore } from '@/store/walletStore';

const allowedPaths = ['/create-wallet', '/import-wallet'];

export default function PrivateRoute() {
  const { currentWallet, hasHydrated } = useWalletStore();
  const location = useLocation();

  // Espera Zustand hidratar
  if (!hasHydrated) {
    return null; // ou <div>Carregando...</div>
  }

  const isAllowed = allowedPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  // Redireciona para criação de carteira se não tiver wallet
  if (!currentWallet && !isAllowed) {
    return <Navigate to="/create-wallet" replace />;
  }

  return <Outlet />;
}
