
import React from 'react';

interface StatsCardProps {
    title: string;
    count: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, count }) => {
    return (
        <div className="bg-light-card dark:bg-dark-card p-4 rounded-lg shadow-md border border-light-border dark:border-dark-border text-center animate-fade-in">
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{title}</p>
            <p className="text-3xl font-bold text-light-accent dark:text-dark-accent">{count}</p>
        </div>
    );
};

export default StatsCard;
