
import React from 'react';

const LoadingSpinner = ({ message = "Processing your video..." }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin-slow"></div>
        <div className="w-20 h-20 border-t-4 border-blue-500 rounded-full absolute top-0 left-0 animate-spin"></div>
      </div>
      <div className="mt-6 bg-white px-6 py-3 rounded-lg animate-pulse-scale">
        <p className="text-lg font-medium text-gray-800">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
