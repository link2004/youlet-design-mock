import React from 'react';
import { LucideIcon, Plus } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  count: number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, count, color }) => {
  return (
    <div className="relative flex flex-col items-center justify-center bg-neutral-100/80 rounded-xl w-full aspect-square pt-2">
      {/* Plus button in top right corner */}
      <div className="absolute top-0 right-0 p-1">
        <div className="bg-white rounded-full p-0.5 shadow-sm">
          <Plus size={12} className="text-neutral-600" />
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center h-full">
        <Icon size={24} className={`${color} mb-1 fill-current opacity-90`} strokeWidth={2.5} />
        <span className="text-lg font-bold text-neutral-800 leading-none">{count}</span>
      </div>
    </div>
  );
};

export default StatCard;