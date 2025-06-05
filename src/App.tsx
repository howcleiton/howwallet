import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WalletPage from '@/pages/WalletPage';
import TokenDetailPage from '@/pages/TokenDetailPage';
import SendPage from '@/pages/SendPage';
import ReceivePage from '@/pages/ReceivePage';
import ActivityPage from '@/pages/ActivityPage';
import DiscoverPage from '@/pages/DiscoverPage';
import SettingsPage from '@/pages/SettingsPage';
import CreateWalletPage from '@/pages/CreateWalletPage';
import ImportWalletPage from '@/pages/ImportWalletPage';
import WelcomePage from '@/pages/WelcomePage';
import CreateOptionPage from '@/pages/CreateOptionPage'; // ✅ Import correto da tela de escolha
import CreateEmailPage from '@/pages/CreateEmailPage';
import CreatePinPage from '@/pages/CreatePinPage';
import ConfirmPinPage from '@/pages/ConfirmPinPage';
import { Toaster } from '@/components/ui/sonner';
import PrivateRoute from '@/routes/PrivateRoute';
import { useEffect } from 'react';
import { useThemeStore } from '@/store/themeStore';

function ThemeEffect() {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return null;
}

function App() {
  return (
    <Router>
      <ThemeEffect />

      <Routes>
        {/* ✅ Tela de boas-vindas na raiz */}
        <Route path="/" element={<WelcomePage />} />

        {/* ✅ Telas públicas */}
        <Route path="/create-option" element={<CreateOptionPage />} />
        <Route path="/create-email" element={<CreateEmailPage />} />
        <Route path="/create-pin" element={<CreatePinPage />} />
        <Route path="/confirm-pin" element={<ConfirmPinPage />} />
        <Route path="/create-wallet" element={<CreateWalletPage />} />
        <Route path="/import-wallet" element={<ImportWalletPage />} />

        {/* ✅ Telas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/token/:tokenId" element={<TokenDetailPage />} />
          <Route path="/send" element={<SendPage />} />
          <Route path="/receive" element={<ReceivePage />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>

      <Toaster position="top-center" />
    </Router>
  );
}

export default App;
