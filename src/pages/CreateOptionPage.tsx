import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useThemeStore } from '@/store/themeStore';

const CreateOptionPage = () => {
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-6 transition-colors ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <motion.div
        className="w-full max-w-sm text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* ✅ Logo atualizada e maior */}
        <img
          src="/icons/logo_howwallet.png"
          alt="How Wallet Logo"
          className="w-28 h-28 mx-auto mb-6 opacity-90"
        />

        <h1 className="text-xl font-bold mb-2">Adicionar uma carteira</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Iniciar a sessão ou importar uma carteira existente
        </p>

        <div className="text-left text-sm text-muted-foreground space-y-4 mb-6">
          <div>
            <strong className="text-white block">🔒 Segurança reforçada</strong>
            Sua carteira está guardada de forma segura e descentralizada com múltiplos fatores.
          </div>
          <div>
            <strong className="text-white block">❤️ Recuperação fácil</strong>
            Recupere sua carteira com seu e-mail e um PIN de 4 dígitos.
          </div>
        </div>

        <Button
          className="w-full mb-3 bg-violet-600 hover:bg-violet-700 text-white"
          onClick={() => navigate('/create-email')}
        >
          Continuar com o e-mail
        </Button>

        <Button
          variant="ghost"
          className={`w-full ${isDark ? 'text-white hover:bg-zinc-900' : 'text-black hover:bg-zinc-200'} border`}
          onClick={() => navigate('/create-wallet')}
        >
          Criar uma carteira de frase semente
        </Button>
      </motion.div>
    </div>
  );
};

export default CreateOptionPage;
