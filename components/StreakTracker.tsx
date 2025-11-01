
import React from 'react';
import { MILESTONES } from '../constants';
import { Milestone } from '../types';
import MilestoneBadge from './MilestoneBadge';

interface StreakTrackerProps {
  currentStreak: number;
}

const StreakTracker: React.FC<StreakTrackerProps> = ({ currentStreak }) => {
  const nextMilestone = MILESTONES.find(m => m.days > currentStreak);
  const progress = nextMilestone ? (currentStreak / nextMilestone.days) * 100 : 100;
  
  const achievedMilestones = MILESTONES.filter(m => m.days <= currentStreak);

  return (
    <div className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-md border border-light-border dark:border-dark-border">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold">Your Learning Streak</h3>
          <p className="text-5xl font-extrabold text-light-accent dark:text-dark-accent">{currentStreak} <span className="text-2xl text-light-text-secondary dark:text-dark-text-secondary font-medium">days</span></p>
        </div>
        <div className="w-full md:w-1/2">
          {nextMilestone && (
            <div>
              <div className="flex justify-between items-center mb-1 text-sm">
                <span className="font-medium">Next Milestone</span>
                <span className="text-light-text-secondary dark:text-dark-text-secondary">{nextMilestone.emoji} {nextMilestone.name} ({nextMilestone.days} days)</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-light-accent dark:bg-dark-accent h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}
          {!nextMilestone && <p className="text-center font-medium">You've reached all milestones! Amazing job! 🚀</p>}
        </div>
      </div>
      {achievedMilestones.length > 0 && (
         <div className="mt-6 border-t border-light-border dark:border-dark-border pt-4">
             <h4 className="text-sm font-semibold mb-2 text-light-text-secondary dark:text-dark-text-secondary">Milestones Achieved</h4>
             <div className="flex flex-wrap gap-2">
                 {achievedMilestones.map(m => <MilestoneBadge key={m.days} milestone={m} />)}
             </div>
         </div>
      )}
    </div>
  );
};

export default StreakTracker;
