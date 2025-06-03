import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import BottomNav from './BottomNav';

interface MobileLayoutProps {
  children: ReactNode;
  className?: string;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.2,
    },
  },
};

const MobileLayout = ({ children, className }: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <motion.main
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={cn('pb-20 px-4', className)}
      >
        {children}
      </motion.main>
      <BottomNav />
    </div>
  );
};

export default MobileLayout;
