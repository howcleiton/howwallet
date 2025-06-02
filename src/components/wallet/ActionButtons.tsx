import { Link } from 'react-router-dom';
import { ArrowUpRight, QrCode, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const ActionButton = ({ 
  icon: Icon, 
  label, 
  to, 
  external,
  delay 
}: { 
  icon: React.ElementType; 
  label: string;
  to: string;
  external?: boolean;
  delay: number;
}) => {
  const ButtonContent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        transition: { delay: delay * 0.1, duration: 0.3 } 
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "flex flex-col items-center justify-center p-4 rounded-xl",
        "bg-[#1a1a28] hover:bg-[#252536] transition-colors",
        "border border-[#2d2d3d]/50",
      )}
    >
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center mb-2">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <span className="text-sm text-gray-300">{label}</span>
    </motion.div>
  );

  if (external) {
    return (
      <a 
        href={to} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex-1"
      >
        {ButtonContent}
      </a>
    );
  }

  return (
    <Link to={to} className="flex-1">
      {ButtonContent}
    </Link>
  );
};

const ActionButtons = () => {
  return (
    <div className="p-4 pt-0">
      <div className="flex gap-3">
        <ActionButton 
          icon={ArrowUpRight} 
          label="Send" 
          to="/send"
          delay={0}
        />
        <ActionButton 
          icon={QrCode} 
          label="Receive" 
          to="/receive"
          delay={1}
        />
        <ActionButton 
          icon={CreditCard} 
          label="Buy" 
          to="https://example.com/buy"
          external
          delay={2}
        />
      </div>
    </div>
  );
};

export default ActionButtons;