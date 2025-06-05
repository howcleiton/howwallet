import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useThemeStore } from '@/store/themeStore';
import { Button } from '@/components/ui/button';

const ChooseCreateMethodPage = () => {
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

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
        <h1 className="text-2xl font-bold mb-4">Como deseja criar sua carteira?</h1>

        <Button
          onClick={() => navigate('/create-email')}
          className="w-full mb-3 bg-violet-600 hover:bg-violet-700 text-white"
        >
          Continuar com e-mail
        </Button>

        <Button
          variant="outline"
          className={`w-full ${
            isDark
              ? 'bg-white text-black hover:bg-zinc-200'
              : 'bg-zinc-100 text-black hover:bg-zinc-300'
          }`}
          onClick={() => navigate('/create-wallet')}
        >
          Criar com frase semente
        </Button>
      </motion.div>
    </div>
  );
};

export default ChooseCreateMethodPage;
