import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CardContainerProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  delay?: number;
}

const CardContainer = ({ 
  children, 
  className, 
  onClick,
  delay = 0
}: CardContainerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        transition: { 
          delay: delay * 0.1,
          duration: 0.3 
        }
      }}
      whileHover={{ scale: onClick ? 1.02 : 1 }}
      whileTap={{ scale: onClick ? 0.98 : 1 }}
      onClick={onClick}
      className={cn(
        // Adapta o visual ao tema
        'bg-white dark:bg-[#14141f] border border-gray-200 dark:border-[#2d2d3d]/50 rounded-2xl p-4 shadow-lg',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default CardContainer;
