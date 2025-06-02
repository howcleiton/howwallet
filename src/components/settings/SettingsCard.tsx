import { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import CardContainer from '@/components/ui/card-container';

interface SettingsCardProps {
  icon: ReactNode;
  title: string;
  description?: string;
  onClick?: () => void;
  rightContent?: ReactNode;
  index: number;
}

const SettingsCard = ({ 
  icon, 
  title, 
  description, 
  onClick, 
  rightContent,
  index
}: SettingsCardProps) => {
  return (
    <CardContainer
      onClick={onClick}
      delay={index}
      className={cn(
        "mb-3 flex items-center justify-between",
        onClick && "hover:bg-[#1a1a28] cursor-pointer"
      )}
    >
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-[#1e1e2e] flex items-center justify-center mr-3">
          {icon}
        </div>
        
        <div>
          <h3 className="font-medium text-white">{title}</h3>
          {description && (
            <p className="text-sm text-gray-400">{description}</p>
          )}
        </div>
      </div>
      
      <div className="flex items-center">
        {rightContent || (
          onClick ? <ChevronRight className="w-5 h-5 text-gray-500" /> : null
        )}
      </div>
    </CardContainer>
  );
};

export default SettingsCard;