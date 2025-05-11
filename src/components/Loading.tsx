import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-40">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-2"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  );
};

export default Loading;