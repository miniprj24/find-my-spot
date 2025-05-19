
import React, { useState, useEffect } from 'react';
import FileUploader from '@/components/FileUploader';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useUpload } from '@/context/UploadContext';

const Index = () => {
  const { isLoading } = useUpload();
  const [initialLoading, setInitialLoading] = useState(true);
  
  useEffect(() => {
    // Show initial loading spinner for 5 seconds
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
      {(isLoading || initialLoading) && (
        <LoadingSpinner message={initialLoading ? "Welcome to FindMySpot..." : "Processing your video..."} />
      )}
      
      <header className="w-full py-6 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-900">
            FindMySpot
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
          <p>© {new Date().getFullYear()} FindMySpot | AI-powered parking detection</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
