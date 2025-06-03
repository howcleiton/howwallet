import { DApp } from '@/types';
import CardContainer from '@/components/ui/card-container';
import { ExternalLink } from 'lucide-react';

interface DAppCardProps {
  dapp: DApp;
  index: number;
}

const DAppCard = ({ dapp, index }: DAppCardProps) => {
  return (
    <CardContainer
      delay={index}
      className="mb-4 overflow-hidden"
    >
      <div className="flex items-start">
        <div className="w-12 h-12 rounded-xl bg-muted p-1 mr-4 flex-shrink-0 overflow-hidden">
          <img 
            src={dapp.iconUrl} 
            alt={dapp.name}
            className="w-full h-full object-contain"
            onError={(e) => {
              // Fallback if image fails to load
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48?text=' + dapp.name.substring(0, 2);
            }}
          />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-foreground">{dapp.name}</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#252536] text-violet-300">
              {dapp.category}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground mt-1 mb-3">
            {dapp.description}
          </p>
          
          <a 
            href={dapp.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-foreground text-sm transition-colors"
          >
            <span>Launch</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </CardContainer>
  );
};

export default DAppCard;