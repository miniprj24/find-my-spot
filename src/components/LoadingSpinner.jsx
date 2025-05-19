
import React from 'react';
import { CarFront } from 'lucide-react';

const LoadingSpinner = ({ message = "Finding your parking spot..." }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-blue-700 z-50">
      <div className="relative mb-8">
        <div className="w-20 h-1 bg-gray-300 rounded-full mt-16"></div>
        
        {/* The moving car */}
        <div className="absolute animate-car-drive">
          <CarFront size={40} className="text-blue-300" />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-white mb-2">FindMySpot</h1>
      <div className="mt-4 bg-white px-8 py-4 rounded-lg">
        <p className="text-lg font-medium text-gray-800">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
