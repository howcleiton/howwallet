import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useWalletStore } from '@/store/walletStore';

const allowedPaths = ['/create-wallet', '/import-wallet', '/onboarding'];

export default function PrivateRoute() {
  const { currentWallet, hasHydrated } = useWalletStore();
  const location = useLocation();

  const isAllowed = allowedPaths.some(path =>
    location.pathname.startsWith(path)
  );

  // Aguarda Zustand carregar os dados do localStorage
  if (!hasHydrated) {
    return null; // ou um <LoadingScreen /> se quiser
  }

  // Redireciona se ainda não tem carteira e não está em rota permitida
  if (!currentWallet && !isAllowed) {
    return <Navigate to="/create-wallet" replace />;
  }

  return <Outlet />;
}
