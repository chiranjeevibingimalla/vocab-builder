
import React from 'react';
import { Milestone } from '../types';

interface MilestoneBadgeProps {
  milestone: Milestone;
}

const MilestoneBadge: React.FC<MilestoneBadgeProps> = ({ milestone }) => {
  return (
    <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300 flex items-center gap-1">
      <span>{milestone.emoji}</span>
      <span>{milestone.name}</span>
    </div>
  );
};

export default MilestoneBadge;
