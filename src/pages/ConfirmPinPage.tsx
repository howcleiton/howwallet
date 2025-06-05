import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useThemeStore } from '@/store/themeStore';
import { useWalletStore } from '@/store/walletStore';

const ConfirmPinPage = () => {
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const { createWallet } = useWalletStore();

  const [confirmPin, setConfirmPin] = useState('');
  const [originalPin, setOriginalPin] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const savedPin = localStorage.getItem('howwallet_temp_pin');
    if (!savedPin) {
      navigate('/create-pin');
    } else {
      setOriginalPin(savedPin);
    }
  }, [navigate]);

  const handleConfirm = async () => {
    if (confirmPin !== originalPin) {
      setError('Os PINs não coincidem.');
      return;
    }

    // Simula a criação de uma carteira padrão
    await createWallet('Minha Wallet');
    localStorage.removeItem('howwallet_temp_pin');
    navigate('/wallet');
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-6 transition-colors ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <div className="w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-4">Confirme seu PIN</h1>

        <Input
          type="password"
          inputMode="numeric"
          maxLength={4}
          value={confirmPin}
          onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))}
          className="mb-4 text-center tracking-widest text-lg"
          placeholder="••••"
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <Button
          className="w-full bg-violet-600 hover:bg-violet-700 text-white"
          onClick={handleConfirm}
          disabled={confirmPin.length !== 4}
        >
          Confirmar
        </Button>
      </div>
    </div>
  );
};

export default ConfirmPinPage;
