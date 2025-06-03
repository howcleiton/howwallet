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
    <div className="flex flex-col min-h-screen bg-[#0b0b0f]">
      <motion.main
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={cn(
          "flex-1 overflow-y-auto pb-20 md:pb-0 max-w-md mx-auto w-full",
          className
        )}
      >
        {children}
      </motion.main>
      <BottomNav />
    </div>
  );
};

export default MobileLayout;
