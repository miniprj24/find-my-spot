
import React, { createContext, useContext, useState } from 'react';

const UploadContext = createContext(undefined);

export const UploadProvider = ({ children }) => {
  const [jsonReport, setJsonReport] = useState(null);
  const [videoDownloadUrl, setVideoDownloadUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <UploadContext.Provider
      value={{
        jsonReport,
        setJsonReport,
        videoDownloadUrl,
        setVideoDownloadUrl,
        isLoading,
        setIsLoading,
        error,
        setError
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error('useUpload must be used within an UploadProvider');
  }
  return context;
};
