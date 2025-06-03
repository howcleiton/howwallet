import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import BottomNav from './BottomNav';

interface MobileLayoutProps {
  children: ReactNode;
  className?: string;
}

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.2 },
  },
};

const MobileLayout = ({ children, className }: MobileLayoutProps) => {
  const location = useLocation();

  // Define em quais rotas o menu inferior deve aparecer
  const showBottomNav = [
    '/wallet',
    '/dashboard',
    '/discover',
    '/activity',
    '/settings',
  ].includes(location.pathname);

  return (
    <div className="flex justify-center bg-background text-foreground transition-colors duration-300 min-h-screen">
      <div className="w-full max-w-md min-h-screen flex flex-col">
        <motion.main
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={cn('pb-20 px-4 flex-1', className)}
        >
          {children}
        </motion.main>

        {/* Renderiza o menu inferior só nas rotas definidas */}
        {showBottomNav && <BottomNav />}
      </div>
    </div>
  );
};

export default MobileLayout;
