import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useThemeStore } from '@/store/themeStore';
import { Button } from '@/components/ui/button';

const CreatePinPage = () => {
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const [pin, setPin] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setPin(value);

      if (value.length === 4) {
        localStorage.setItem('howwallet_temp_pin', value); // ✅ Salva o PIN temporariamente
        setTimeout(() => navigate('/confirm-pin'), 300);   // ✅ Redireciona para confirmar
      }
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-6 transition-colors ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <motion.div
        className="w-full max-w-sm text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-4 text-xs text-yellow-500 font-medium">
          Isto não pode ser recuperado.
        </div>

        <h1 className="text-xl font-bold mb-2">Criar um PIN</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Isto é utilizado para tornar sua carteira segura em todos os dispositivos.
        </p>

        <input
          type="password"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={4}
          placeholder="PIN"
          value={pin}
          onChange={handleChange}
          className="tracking-widest text-center text-2xl px-4 py-2 rounded-md w-full bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white mb-6"
        />

        <Button
          disabled={pin.length < 4}
          onClick={() => {
            if (pin.length === 4) {
              localStorage.setItem('howwallet_temp_pin', pin);
              navigate('/confirm-pin');
            }
          }}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white"
        >
          Continuar
        </Button>
      </motion.div>
    </div>
  );
};

export default CreatePinPage;
