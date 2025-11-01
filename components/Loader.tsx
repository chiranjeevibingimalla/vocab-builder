
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="w-12 h-12 rounded-full animate-spin border-4 border-dashed border-light-accent dark:border-dark-accent border-t-transparent"></div>
      <p className="mt-4 text-lg font-semibold text-light-text-secondary dark:text-dark-text-secondary">Generating today's content...</p>
      <p className="text-sm text-gray-500">This may take a moment.</p>
    </div>
  );
};

export default Loader;
