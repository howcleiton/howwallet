import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useThemeStore } from '@/store/themeStore';
import { useWalletStore } from '@/store/walletStore';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { motion } from 'framer-motion';

const WelcomePage = () => {
  const navigate = useNavigate();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { theme } = useThemeStore();
  const { currentWallet } = useWalletStore();

  const isDark = theme === 'dark';

  // Redirecionar automaticamente se já existir carteira
  useEffect(() => {
    if (currentWallet) {
      navigate('/wallet');
    }
  }, [currentWallet]);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-6 relative transition-colors ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      {/* Ícones decorativos de fundo (mock) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10 select-none">
        <div className="absolute top-8 left-8 w-12 h-12 bg-purple-500 rounded-full blur-xl" />
        <div className="absolute top-16 right-12 w-10 h-10 bg-violet-400 rounded-full blur-lg" />
        <div className="absolute bottom-16 left-10 w-14 h-14 bg-orange-400 rounded-full blur-xl" />
        <div className="absolute bottom-8 right-8 w-12 h-12 bg-green-500 rounded-full blur-lg" />
      </div>

      {/* Conteúdo principal */}
      <motion.div
        className="z-10 w-full max-w-sm text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl font-bold mb-3">Boas-vindas à How Wallet</h1>
        <p className="text-sm text-zinc-500 mb-6">
          Para começar, crie uma nova carteira ou importe uma carteira existente.
        </p>

        {/* Bolinhas de progresso */}
        <div className="flex justify-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${
                i === 0 ? 'bg-violet-500' : isDark ? 'bg-zinc-700' : 'bg-zinc-300'
              }`}
            />
          ))}
        </div>

        {/* Checkbox com termos */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Checkbox
            id="terms"
            checked={acceptedTerms}
            onCheckedChange={(c) => setAcceptedTerms(!!c)}
            className={`border ${
              isDark ? 'border-zinc-700 bg-zinc-900' : 'border-zinc-300 bg-white'
            }`}
          />
          <label
            htmlFor="terms"
            className="text-sm select-none cursor-pointer"
          >
            Aceito os <span className="underline">termos de serviço</span>
          </label>
        </div>

        {/* Botão primário */}
        <Button
  disabled={!acceptedTerms}
  className="w-full mb-3 bg-violet-600 hover:bg-violet-700 text-white"
  onClick={() => navigate('/create-option')} // ✅ novo destino
>
  Criar uma nova carteira
</Button>


        {/* Botão secundário com clique condicional (mantendo estilo) */}
        <Button
          variant="ghost"
          onClick={() => {
            if (acceptedTerms) {
              navigate('/import-wallet');
            }
          }}
          className={`w-full ${
            isDark
              ? 'bg-white text-black hover:bg-zinc-200'
              : 'bg-zinc-100 text-black hover:bg-zinc-300'
          } border transition-colors`}
        >
          Já tenho uma carteira
        </Button>
      </motion.div>
    </div>
  );
};

export default WelcomePage;
