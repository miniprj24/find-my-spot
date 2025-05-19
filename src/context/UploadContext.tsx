
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UploadContextType {
  jsonReport: any;
  setJsonReport: React.Dispatch<React.SetStateAction<any>>;
  videoDownloadUrl: string;
  setVideoDownloadUrl: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export const UploadProvider = ({ children }: { children: ReactNode }) => {
  const [jsonReport, setJsonReport] = useState<any>(null);
  const [videoDownloadUrl, setVideoDownloadUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

export const useUpload = (): UploadContextType => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error('useUpload must be used within an UploadProvider');
  }
  return context;
};
