
import React from 'react';
import FileUploader from '@/components/FileUploader';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useUpload } from '@/context/UploadContext';

const Index = () => {
  const { isLoading } = useUpload();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
      {isLoading && <LoadingSpinner />}
      
      <header className="w-full py-6 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-900">
            Parking Spot Detector
          </h1>
          <p className="text-center text-blue-600 mt-2 max-w-2xl mx-auto">
            Upload video footage to automatically detect and analyze available parking spots
          </p>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <FileUploader />
      </main>
      
      <footer className="w-full py-6 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Parking Spot Detector | AI-powered video analysis</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
