import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { useThemeStore } from '@/store/themeStore';

const CreateEmailPage = () => {
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const [email, setEmail] = useState('');

  const handleContinue = () => {
    if (!email || !email.includes('@')) return;
    navigate('/create-pin'); // 👉 redireciona para próxima etapa
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
        <h1 className="text-xl font-bold mb-2">Digite seu e-mail</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Nós usaremos isso para proteger e recuperar sua carteira.
        </p>

        <Input
          type="email"
          placeholder="exemplo@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />

        <Button
          onClick={handleContinue}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white"
          disabled={!email.includes('@')}
        >
          Continuar
        </Button>
      </motion.div>
    </div>
  );
};

export default CreateEmailPage;
